const like = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

like.post('/:userId/:postId', authenticateToken, async(req, res) => {
    const user = await db.User.findById(req.params.userId)
    const post = await db.Post.findById(req.params.postId).populate('user', 'firstName lastName userName img')
    console.log(post)

    if (!user || !post) return res.status(400).json({ message: 'Something went wrong...' })

    const found = post.likes.find(like => {
        return like.toString() === user._id.toString()
    })

    if (found) {
        post.likes.remove(user)
        user.likes.remove(post)
        post.save()
        user.save()
        return res.status(200).json(post)
    } else {
        post.likes.push(user)
        user.likes.push(post)
        post.save()
        user.save()
        return res.status(200).json(post)
    }
})

module.exports = like