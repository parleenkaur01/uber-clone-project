const express = require('express');
const router = express.Router();

const {body} = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.post('/register',[ //contains a list of validation checks
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage
    ('First name mustbe at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
], //if any of those ail,express validato stores te error temp inside (req)
userController.registerUser //EXPRESS WILL CALL A FUNCTION REGISTERUSER
)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')


],
userController.loginUser
)

router.get('/profile', authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)



module.exports= router;