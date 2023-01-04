const mongoose = require("mongoose");

const blogModel = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog Title required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Blog description required.']
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: [true, "Blog category is required"],
    // },
    numViews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Author is required"],
    },
    photo: {
        type: String,
        //required: [true, "blog Image is required"],
    },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    } 
)



//Compile the blog model
const BlogModel = mongoose.model("BlogModel", blogModel);

module.exports = BlogModel;