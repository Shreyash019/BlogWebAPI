const bcrypt = require('bcryptjs');
const AppError = require('./../utils/appError');
const authToken = require('./../utils/authToken');
const UserModel = require('./../models/userModel');
const BlogModel = require('./../models/blogModel');
const CommentModel = require('./../models/commentModel');


///////////////////////////
////User Authentication////
///////////////////////////

exports.userSignUp = async (req, res, next)=>{
    const newUser = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const token = authToken.signToken(newUser._id);
    res.status(201).json({
        status: 'Sucess',
        token,
        data: {
            newUser
        }
    });
}

exports.userSignIn = async (req,res,next)=>{
    const {email, password} = req.body;
    let signUser;
    if(!email || !password){
        console.log('Please provide email and password.')
        return res.status(400).send('Please provide email and password.')
        //return next(new AppError('Please provide email and password', 400));
    }
    signUser = await UserModel.findOne({email}).select('+password')
    console.log(signUser.email);
    if(!signUser || !await signUser.correctPassword(password, signUser.password)){
        console.log(`Student doestn't exist`)
        return res.status(400).send(`Student doestn't exist`);
        //return next(new AppError('Incorrect Email or Password', 401));
    }

    const token = authToken.signToken(signUser._id);
    res.status(200).json({
        status: 'Success',
        token
    })
}

exports.updatePassword = async (req, res, next)=>{
    const { password } = req.body;
    try{
        const user = req.userAuth;
        // Checking if user is updating password
        if(password){
            const upPassword = await bcrypt.hash(password, 12);
            await UserModel.findByIdAndUpdate(user, 
                {password: upPassword},
                {new: true, runValidators: true}
            );
            res.json({
                status: "success",
                data: "Password has been changed successfully",
              });
            } else {
              return res.status(204).send("Please provide password field");
            }
    } catch(err){
        return res.status(400).send(err);
    }
}



///////////////////////////////
////User Profile Management////
///////////////////////////////

exports.userProfile = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to user profile page');
    } catch(err){
        res.status(400).send(err);
    }
}

exports.updateUser = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to user profile update page');
    } catch(err){
        res.status(400).send(err);
    }
}

exports.deleteUserAccount = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to user profile delete page');
    } catch(err){
        res.status(400).send(err);
    }
}



//////////////////////
////User Activites////
//////////////////////

exports.getAllUsers = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to getting all user page');
    } catch(err){
        res.status(400).send(err);
    }
}

exports.userViewedMe= (req, res, next)=>{
    try{
        res.status(200).send('Welcome to user viewed my profile page');
    } catch(err){
        res.status(400).send(err);
    }
}

