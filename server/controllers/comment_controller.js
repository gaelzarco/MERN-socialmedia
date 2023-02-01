const comment = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

comment.get('/:commentId', async (req, res) => {
    const commentId = req.params.commentId
    db.Comment.findById(commentId)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments', 
        populate: {
            path: 'user',
            select: 'firstName lastName userName img'
        }
    })
    .populate({
    path: 'post',
        populate: {
            path: 'user',
            select: 'firstName lasName userName img'
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => console.log(err))
    })

comment.post('/:postId', authenticateToken, async (req, res) => {
    console.log(req.body)
    const { user, ...rest } = req.body
    if (!user) return res.status(400).json({ message: 'Please sign in to post a comment' })

    const post = await db.Post.findById(req.params.postId)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments',
        populate: {
            path: 'comments'
        }, 
        populate: {
            path: 'user',
            select: 'firstName lastName userName img',
        },
    })
    if (!post) return res.status(400).json({ message: 'Something went wrong..' })

    const newCommentUser = await db.User.findById(user)
    if (!newCommentUser) return res.status(400).json({ message: 'Not a valid user.' })

    const newComment = await db.Comment.create({ user, post, ...rest })

    post.comments.push(newComment)
    newCommentUser.comments.push(newComment)

    await post.save()
    await newCommentUser.save()
    return res.status(200).json(post)
})

comment.post('/reply/:commentId/:postId', async (req, res) => {
    const { user, ...rest } = req.body
    if (!user) return res.status(400).json({ message: 'Please sign in to post a comment' })

    const newCommentUser = await db.User.findById(user)
    if (!newCommentUser) return res.status(400).json({ message: 'Not a valid user.' })

    const comment = await db.Comment.findById(req.params.commentId)
    if (!comment) return res.status(400).json({ message: 'Comment you are replying to does not exist' })

    const newComment = await db.Comment.create({ user, replyTo: comment, ...rest })

    comment.comments.push(newComment)
    newCommentUser.comments.push(newComment)

    const post = await db.Post.findById(req.params.postId)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments',
        populate: {
            path: 'comments'
        }
    })
    .populate({
        path: 'comments.comments.user',
        populate: {
            path: 'user',
            select: 'firstName lastName userName img'
        }
    })
    if (!post) return res.status(400).json({ message: 'Parent post is missing' })

    await comment.save()
    await newCommentUser.save()
    return res.status(200).json(post)
})

module.exports = comment