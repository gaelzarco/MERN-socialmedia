require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

module.exports.mongoAtlasConnect = () =>  { mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    () => console.log(`connected to ${MONGO_URI} with mongoose`)
) }