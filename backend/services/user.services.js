const userModel = require('../models/user.model');

module.exports.createUser= async({
    firstname,lastname,email,password
}) =>{
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    const user= await userModel.create({ //actual step that saves the valid user data to mondodb database
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}