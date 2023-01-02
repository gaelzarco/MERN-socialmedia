const post = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

post.get('/', async (req, res) => {
    db.Post.find().populate('user', 'firstName lastName userName img')
    .then(post => res.status(200).json(post))
    .catch(err => console.log(err))
})

post.get('/:id', async (req, res) => {
    const id = req.params.id
    
    db.Post.findById(id)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments', 
        populate: {
            path: 'user',
            select: 'firstName lastName userName img'
        }
    })
    .exec()
    .then(post => {
        console.log(post)
        res.status(200).json(post)
    })
    .catch(err => console.log(err))
})

post.post('/',  authenticateToken, async (req, res) => {
    db.Post.create(req.body)
    .then(() => res.json({ message: 'Post was successful!' }))
    .catch(err => console.log(err))
})

post.post('/like/:userId/:postId', authenticateToken, async (req, res) => {
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

module.exports = post