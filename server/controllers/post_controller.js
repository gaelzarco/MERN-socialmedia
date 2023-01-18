const post = require('express').Router()
const fs = require('fs')
const multer = require('multer')
const db = require('../models')
const authenticateToken = require('../utils')

const upload = multer({ dest: 'uploads/' })

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

    if (post) {
        console.log(post)
        return res.status(200).json(post)
    }
})

post.post('/',  upload.single('media'), async (req, res) => {
   try {
    const user = await db.User.findById(req.body.user)
    if (!user) return res.status(400).json({ 'message': 'You must be logged in to make a post' })

    const newImage = ({
        data: fs.readFileSync(req.file.path),
        contentType: 'image/png'
    })

    console.log(newImage)

    const post = await db.Post.create({ ...req.body, media: newImage.data })

    user.posts.push(post)
    await user.save()
    return res.status(200).json({ message: 'Post was successful!' })

   } catch (err) {

    console.log(err)
    return res.status(400).json({ 'message': `Something went wrong: ${err}` })

   }
})

module.exports = post