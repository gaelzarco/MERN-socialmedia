const post = require('express').Router()
const db = require('../models')
const authenticateToken = require('../utils')

post.get('/', async (req, res) => {
    db.Post.find().populate('user', 'userName firstName lastName img')
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => console.log(err))
})

post.post('/',  authenticateToken,async (req, res) => {
    console.log(req.body)
    db.Post.create(req.body)
    .then(() => res.json({ message: 'Post was successful!' }))
    .catch(err => console.log(err))
})

module.exports = post