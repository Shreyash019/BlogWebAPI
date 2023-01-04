const UserModel = require('./../models/userModel');
const BlogModel = require('./../models/blogModel');

exports.blogHome = (req, res, next)=>{
    res.status(200).send('Welcome to post home page');
}


////////////////////////
////Fetching Blog(s)////
////////////////////////
exports.getAllBlogs = async (req, res, next)=>{
    console.log(req.userAuth)
    let user = req.userAuth;
    try{
        // Finding User Blogs by ID
        const userBlogs = await BlogModel.find({user});
        console.log(userBlogs)

        res.status(201).json({
            status: 'Success',
            data: {
                userBlogs
            }
        });
    } catch(err){
        return res.status(200).send(err);
    }
}

exports.getSingleBlog = async (req, res, next)=>{
    //console.log(req.userAuth)
    let user = req.userAuth;
    let id = req.params.id;
    try{
        // Finding User Blogs by ID
        const userBlog = await BlogModel.findById({_id: id, user: user});
        //console.log(userBlog)

        res.status(201).json({
            status: 'Success',
            data: {
                userBlog
            }
        });
    } catch(err){
        res.status(200).send(err);
    }
}

exports.getUsersBlog = async (req, res, next)=>{
    //console.log(req.userAuth)
    try{
        // Finding User Blogs by ID
        const userBlogs = await BlogModel.find();
        console.log(userBlogs)

        res.status(201).json({
            status: 'Success',
            data: {
                userBlogs
            }
        });
    } catch(err){
        res.status(200).send(err);
    }
}



//////////////////////////////////
////New Blog creation & Update////
//////////////////////////////////
exports.createBlog = async (req, res, next)=>{
    const {title, description} = req.body;
    //console.log(req.body)
    //console.log(req.userAuth)
    try{
        // Finding User
        const blogger = await UserModel.findById(req.userAuth);
        // Creating blog
        const newBlog = await BlogModel.create({
            title,
            description,
            user: blogger._id,
            //photo: req?.file?.path
        });
        // Pushing to user's post array
        blogger.posts.push(newBlog);
        await blogger.save();
        res.status(201).json({
            status: 'Success',
            data: {
                newBlog
            }
        });
    } catch(err){
        return res.status(200).send(err);
    }
}

exports.updateBlog = async (req, res, next)=>{
    let id = req.params.id;
    let user = req.userAuth;

    // console.log(req.body)
    // console.log(req.userAuth)
    try{
        const userBlogCheck = await BlogModel.findById({_id: id, user: user});
        if(!userBlogCheck){
            return res.send(`User don't matched.`)
        }
        if(userBlogCheck.user.toString() !==req.userAuth.toString()){
            return res.status(400).send(`You don't have permission to update the blog.`)
        }
        const updateBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true
        });
        res.status(201).json({
            status: 'Success',
            data: {
                updateBlog
            }
        });
    } catch(err){
        res.status(200).send(err);
    }
}



///////////////////////////
////Deleteing User Blog////
///////////////////////////
exports.deleteBlog = async (req, res, next)=>{
    let id = req.params.id;
    let user = req.userAuth;
    try{
        const userBlogCheck = await BlogModel.findById({_id: id, user: user});
        if(!userBlogCheck){
            return res.status(400).send(`User don't matched.`)
        }
        if(userBlogCheck.user.toString() !==req.userAuth.toString()){
            return res.status(400).send(`You don't have permission to delete the blog.`)
        }
        const deleteBlog = await BlogModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'Success',
            data: {
                deleteBlog
            }
        });
    } catch(err){
        res.status(200).send(err);
    }
}



///////////////////////
////Blog Activities////
///////////////////////
exports.userBlogLikes = async (req, res, next)=>{
    
    try{
        let likeCheck;
        let user = req.userAuth;
        const blog = await BlogModel.findById(req.params.id);
        // db.inventory.find( { tags: ["red", "blank"] } )
        likeCheck = blog.likes.includes(user);
        //console.log(likeCheck)
        if(likeCheck){
            blog.likes = blog.likes.filter(like => like.toString()!==req.userAuth.toString());
            await blog.save();
        } else {
            blog.likes.push(req.userAuth);
            await blog.save();
        }
        res.status(200).json({
            status: 'Success',
            data: blog
        });
    } catch(err){
        res.status(200).send(err);
    }
}




