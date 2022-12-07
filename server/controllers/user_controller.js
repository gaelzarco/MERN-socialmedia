const user = require('express').Router()
const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config()
const TOKEN_SECRET = process.env.TOKEN_SECRET

const generateAccessToken = (username) => {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '3600s' })
}

user.post('/', async (req, res) => {
    const { password, ...rest } = req.body

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
        password: await bcrypt.hash(password, 10)
    })
    .then(() => {
        token = generateAccessToken({ username: req.body.userName })
        return res.status(200).json({ accessToken: token })
    })
})

user.post('/login', async (req, res) => {
    if(!req.body.userName || !req.body.password) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    let user = await db.User.findOne({ userName: req.body.userName })
    console.log(user)

    if (!user) {
        return res.status(400).json({ message: 'Username is incorrect' })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({ message: 'Password is incorrect' })
    } else {
        token = generateAccessToken({ username: user.userName })
        return res.status(200).json({ accessToken: token })
    }

})

module.exports = user