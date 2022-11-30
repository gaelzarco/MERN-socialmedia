require('dotenv').config()
const express = require('express')
const mongoose = require('./models')
const app = express()

const PORT = process.env.PORT
mongoose.mongoAtlasConnect()

app.get('/api', (req, res) => {
    res.json({ 'message': 'connected to node server' })
    console.log('Client connected successfully')
})

app.listen(PORT, () => console.log(`node processing on PORT ${PORT}`))