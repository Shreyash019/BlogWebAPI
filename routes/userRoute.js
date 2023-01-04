const express = require('express');
const router = express.Router();
const utils = require('./../utils/authToken');
const userController = require('./../controllers/userController');


///////////////////////////
////User authentication////
///////////////////////////
router.route('/signup').post(userController.userSignUp);
router.route('/signin').post(userController.userSignIn);
router.route('/updatepassword').put(utils.protects, userController.updatePassword);


////////////////////////////////////
////User User Profile Management////
////////////////////////////////////
router.route('/profile').get(utils.protects, userController.userProfile);
router.route('/updateProfile').put(utils.protects, userController.updateUser);
router.route('/deleteAccount').delete(utils.protects, userController.deleteUserAccount);


///////////////////////
////User Activities////
///////////////////////
router.route('/allusers').get(utils.protects, userController.getAllUsers);
//router.route('/profile/:id').get(utils.protects, userController.userViewedMe);


module.exports = router;