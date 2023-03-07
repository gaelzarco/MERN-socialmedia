const user = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const authenticateToken = require('../utils')

require('dotenv').config()
const TOKEN_SECRET = process.env.TOKEN_SECRET

const { uploadFile, getFile } = require('../utils/s3')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generateAccessToken = (username) => {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '3600s' })
}

user.get('/', authenticateToken, async (req, res) => {
    const users = await db.User.find().select('firstName lastName userName img')
    
    const usersWithUrls = await Promise.all(users.map(async (user) => {
        if (user.img) {
            const signedUrl = await getFile(user.img)
            user.img = signedUrl
            return user
        }
        return user
    }))

    res.status(200).json(usersWithUrls)

})

user.post('/create', upload.single('img'), async (req, res) => {
    const { password, ...rest } = req.body

    const fileName = req.file ? await uploadFile(req.file) : 'defaultuser'

    if(!password || !rest) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    if (await db.User.findOne({ email: req.body.email })) {
        return res.status(400).json({ message:  'Email is associated with another account' })
    }
    
    if (await db.User.findOne({ userName: req.body.userName })) {
        return res.status(400).json({ message:  'Username is associated with another account'})
    }

    db.User.create({
        ...rest,
        img: fileName,
        password: await bcrypt.hash(password, 10)
    })
    .then(async () => {
        const token = generateAccessToken({ username: req.body.userName })
        const user = await db.User.findOne({ userName: req.body.userName })

        const userImg = await getFile(user.img)
        user.img = userImg

        return res.status(200).json({ accessToken: token, user: user })
    })
})

user.post('/login', async (req, res) => {
    if(!req.body.userName || !req.body.password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    let user = await db.User.findOne({ userName: req.body.userName })

    if (!user) {
        return res.status(400).json({ message: 'Username is incorrect' })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: 'Password is incorrect' })
    }

    token = generateAccessToken({ username: user.userName })

    let userImg = await getFile(user.img)
    user.img = userImg
    
    return res.status(200).json({ accessToken: token, user: user })

})

module.exports = user