const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log(`connected to ${MONGO_URI} with mongoose`)
) 

app.get('/api', (req, res) => {
    res.json({ 'message': 'connected to node server' })
    console.log('Client connected successfully')
})

const userController = require('./controllers/user_controller')
app.use('/api/user', userController)

const postController = require('./controllers/post_controller')
app.use('/api/posts', postController)

const commentController = require('./controllers/comment_controller')
app.use('/api/comments', commentController)

const likeController = require('./controllers/like_controller')
app.use('/api/like', likeController)

app.listen(PORT, () => console.log(`node processing on PORT ${PORT}`))