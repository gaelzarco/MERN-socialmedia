const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    img: String,
    bio: String,
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [7, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be atleast 6 characters long']
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdOn: {
        type: Date, default: Date.now
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User