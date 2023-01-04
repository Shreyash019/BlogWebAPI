const express = require('express');
const router = express.Router();
const utils = require('./../utils/authToken');
const commentController = require('./../controllers/commentController');

router.route('/').get(utils.protects, commentController.commentHome);

router.route('/createcomment/:id').post(utils.protects, commentController.createComment);
router.route('/updatecomment/:id').get(utils.protects, commentController.commentUpdate);
router.route('/deletecomment/:id').get(utils.protects, commentController.commentDelete);


module.exports = router;