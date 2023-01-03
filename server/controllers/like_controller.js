const like = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

like.post('/:postId', authenticateToken, async(req, res) => {
    const userId = req.body
    const user = await db.User.findById(userId)

    const post = await db.Post.findById(req.params.postId)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments', 
        populate: {
            path: 'user',
            select: 'firstName lastName userName img'
        }
    })
    console.log(post)

    if (!user || !post) return res.status(400).json({ message: 'Something went wrong...' })

    const found = post.likes.find(like => {
        return like.toString() === user._id.toString()
    })

    if (found) {
        post.likes.remove(user)
        user.likes.remove(post)
        await post.save()
        await user.save()
        return res.status(200).json(post)
    } else {
        post.likes.push(user)
        user.likes.push(post)
        await post.save()
        await user.save()
        return res.status(200).json(post)
    }
})

like.post('/comment/:commentId', authenticateToken, async(req, res) => {
    const userId = req.body
    const user = await db.User.findById(userId)

    const comment = await db.Comment.findById(req.params.commentId)
    const post = await db.Post.findById(comment.post)
        .populate('user', 'firstName lastName userName img')
        .populate({ 
            path: 'comments', 
            populate: {
                path: 'user',
                select: 'firstName lastName userName img'
            }
        })

    if (!user || !comment || !post) return res.status(400).json({ message: 'Something went wrong...' })

    const found = comment.likes.find(like => {
        return like.toString() === user._id.toString()
    })

    if (found) {
        comment.likes.remove(user)
        user.likedComments.remove(comment)
        await comment.save()
        await user.save()
        await post.save()
        return res.status(200).json(post)
    } else {
        comment.likes.push(user)
        user.likedComments.push(comment)
        await comment.save()
        await user.save()
        await post.save()
        return res.status(200).json(post)
    }
})

module.exports = like