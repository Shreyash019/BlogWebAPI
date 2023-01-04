const express = require('express');
const router = express.Router();
const utils = require('./../utils/authToken');
const blogController = require('../controllers/blogController');

router.route('/').get(utils.protects, blogController.blogHome);

////////////////////////
////Fetching Blog(s)////
////////////////////////
router.route('/getblogs').get(utils.protects, blogController.getAllBlogs)
router.route('/getblog/:id').get(utils.protects, blogController.getSingleBlog)
router.route('/getusersblog').get(utils.protects, blogController.getUsersBlog)

//////////////////////////////
////Blog Creation & Update////
//////////////////////////////
router.route('/postblog').post(utils.protects, blogController.createBlog)
router.route('/updateblog/:id').put(utils.protects, blogController.updateBlog)


router.route('/delete/:id').delete(utils.protects, blogController.deleteBlog)

///////////////////////
////Blog Activities////
///////////////////////
router.route('/likes/:id').get(utils.protects, blogController.userBlogLikes)


module.exports = router;