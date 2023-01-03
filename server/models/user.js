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
    img: {
        type: String,
        default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficon-library.com%2Fimages%2Fdefault-user-icon%2Fdefault-user-icon-8.jpg&f=1&nofb=1&ipt=49b3f362b0df9b6f33fb958c85fe3805902108dd36dbd4aa20a1d6a306a4021a&ipo=images'
    },
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
    likedComments: [{
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