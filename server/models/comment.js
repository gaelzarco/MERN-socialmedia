const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
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
        ref: 'Like'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdOn: {
        type: Date, default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment