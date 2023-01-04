const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        select: false
    },
    profilePhoto: {
        type: String,
    },
    summary: {
        type: String,
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
    ],
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword)
}


//Compile the user model
const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;