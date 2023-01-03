const comment = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

comment.post('/:postId', authenticateToken, async(req, res) => {
    const { user, ...rest } = req.body
    if (!user) return res.status(400).json({ message: 'Please sign in to post a comment' })

    const newCommentUser = await db.User.findById(user)
    if (!newCommentUser) return res.status(400).json({ message: 'Not a valid user.' })

    const post = await db.Post.findById(req.params.postId)
    if (!post) return res.status(400).json({ message: 'Something went wrong..' })

    const newComment = await db.Comment.create({ user, post, ...rest })

    post.comments.push(newComment)
    newCommentUser.comments.push(newComment)
    await post.save()
    await newCommentUser.save()
    return res.status(200).json(post)
})

module.exports = comment