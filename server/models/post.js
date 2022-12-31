const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: String,
    body: {
        type: String,
        required: true,
        minlength: [1, 'Body cannot be empty']
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdOn: {
        type: Date, default: Date.now
    }
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post