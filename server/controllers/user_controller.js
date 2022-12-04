const user = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')

user.post('/', async (req, res) => {
    const { password, ...rest } = req.body

    if(!password || !rest) {
        return res.status(400).json({ message: 'Please enter all fields' })
    }

    if (await db.User.findOne({ email: req.body.email }) === []) {
        return res.status(400).json({ message:  'Email is associated with another account' })
    }
    
    if (await db.User.findOne({ userName: req.body.userName }) === []) {
        return res.status(400).json({ message:  'Username is taken'})
    }

    db.User.create({
        ...rest,
        password: await bcrypt.hash(password, 10)
    })
    .then(() => {
        return res.status(200).json({ message: 'User created!' })
    })
})

module.exports = user