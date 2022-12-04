const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
    createdOn: Date
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post