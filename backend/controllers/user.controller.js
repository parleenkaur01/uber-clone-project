//this file handles HTTP requests/respones (what client interacts with)

const userModel= require('../models/user.model');
const userService = require('../services/user.services');
const {validationResult} = require('express-validator');
const BlacklistTokenModel= require('../models/blacklistToken.model');

module.exports.registerUser= async (req,res,next) =>{
    const errors= validationResult(req); //COLLECTS ALL VALIDATION RESULT from req
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()}); //send all validation errors to client 
    }


    const {fullname,email,password} = req.body;
    const isUserAlready= await userModel.findOne({email});
    if(isUserAlready){
        return res.status(400).json({message:'User with this email already exists'});
    }   



    const hashedPassword = await userModel.hashPassword(password);

    const user= await userService.createUser({ //passes the prepared data to the service layer
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword
    })

    const token = user.generateAuthToken();

    res.status(201).json({token,user}) //sends a json object contaning both tokenadn user



}

module.exports.loginUser= async(req,res,next)=>{
    const errors= validationResult(req); //COLLECTS ALL VALIDATION RESULT from req
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()}); //send all validation errors to client 
    }

    const {email,password}= req.body;

    const user= await userModel.findOne({email}).select('+password'); //normally hide password sbut for this query include it. //userModel = talks directly to MongoDB

    if(!user){
        return res.status(401).json({message:'Invalid email or password'});
    }
    const isMatch= await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:'Invalid email or password'});
    }

    const token= user.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,user})
}

module.exports.getUserProfile= async(req,res,next)=>{
    res.status(200).json(req.user)
}
module.exports.logoutUser= async(req,res,next) =>{
    res.clearCookie('token');
    const token= req.cookies.token ||req.headers.authorization.split(' ')[1];

    await BlacklistTokenModel.create({token});
    
    res.status(200).json({message:'Logged out'});
}
