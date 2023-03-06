const post = require('express').Router()
const multer = require('multer')
const db = require('../models')
const authenticateToken = require('../utils')

const { uploadFile, getFile } = require('../utils/s3')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

post.get('/', async (req, res) => {
    const posts = await db.Post.find().populate('user', 'firstName lastName userName img')

    const postsWithUrls = await Promise.all(posts.map(async (post) => {
            if (post.media) {
                const signedUrl = await getFile(post.media)
                post.media = signedUrl
                return post
            }
            return post
        }))

        res.status(200).json(postsWithUrls)
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
                select: 'firstName lastName userName img'
            }
        }
    })
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'firstName lastName userName img'
        }
    })

    if (post) {
        res.status(200).json(post)
    }
})

post.post('/', authenticateToken, upload.single('media'), async (req, res) => {
    console.log('Route being pinged')
    const user = await db.User.findById(req.body.user)
    if (!user) return res.status(400).json({ 'message': 'You must be logged in to make a post' })

    if (req.file) {
        const { file } = req
        const fileName = await uploadFile(file)
    
        const post = await db.Post.create({ ...req.body, media: fileName })

        user.posts.push(post)
        await user.save()
        res.status(200).json({ message: 'Post was successful!' })
    } else {
        const post = await db.Post.create({ ...req.body  })
        console.log('post: ' + post)

        user.posts.push(post)
        await user.save()
        res.status(200).json({ message: 'Post was successful!' })
    }
})

module.exports = post