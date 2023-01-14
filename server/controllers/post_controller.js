const post = require('express').Router()
const { model } = require('mongoose')
const db = require('../models')
const { populate } = require('../models/user')
const authenticateToken = require('../utils')

post.get('/', async (req, res) => {
    db.Post.find().populate('user', 'firstName lastName userName img')
    .then(posts => res.status(200).json(posts))
    .catch(err => console.log(err))
})

post.get('/:id', async (req, res) => {
    const id = req.params.id
    
    const post = await db.Post.findById(id)
    .populate('user', 'firstName lastName userName img')
    .populate({ 
        path: 'comments',
        populate: {
            path: 'comments',
            populate: {
                path: 'user',
                select: 'firstName lasName userName img'
            }
        }
    })
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'firstName lasName userName img'
        }
    })

    if (post) return res.status(200).json(post)
})

post.post('/',  authenticateToken, async (req, res) => {
    // console.log(req.body)
    const post = await db.Post.create(req.body)
    
    if (post) {
        const user = await db.User.findById(req.body.user._id)
        user.posts.push(post)
        await user.save()
        return res.status(200).json({ message: 'Post was successful!' })
    } else return res.status(400).json({ messsage: 'Post was not successful!' })
})

module.exports = post