const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)