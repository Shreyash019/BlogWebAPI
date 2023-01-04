const UserModel = require('./../models/userModel');
const BlogModel = require('./../models/blogModel');
const CommentModel = require('./../models/commentModel');

exports.commentHome = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to comment home page');
    } catch(err){
        res.status(400).send(error)
    } 
}

exports.createComment = async (req, res, next)=>{
    const {description} = req.body;
    let id = req.params.id;
    let user = req.userAuth;
    console.log('headers:: ',id, user)
    try{
        const blog = await BlogModel.findById({_id: id, user: user});
        const users = await UserModel.findById(req.userAuth);
        // comment 
        console.log('Blog Details :: ',blog)
        const comment = await CommentModel.create({
            blog: id,
            user: user,
            description
        });
        //console.log(comment)
        console.log(comment._id);
        blog.comments.push(comment._id);
        console.log(blog.comments)
        users.comments.push(comment._id);

        await blog.save({ validateBeforeSave: false });
        await users.save({ validateBeforeSave: false });

        res.status(201).json({
            status: 'Success',
            data: comment
        })

    } catch(err){
        console.log(err)
        res.status(400).send(err)
    } 
}

exports.commentUpdate = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to comment like page');
    } catch(err){
        res.status(400).send(error)
    } 
}

exports.commentDelete = (req, res, next)=>{
    try{
        res.status(200).send('Welcome to comment dislike page');
    } catch(err){
        res.status(400).send(error)
    } 
}