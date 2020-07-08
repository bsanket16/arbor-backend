require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const authRoutes = require('./routes/auth')

//middleware
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(bodyParser.json())

// routes
app.use('/api', authRoutes)

//db connection
mongoose.connect( process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Database connected')
})

const port = process.env.PORT || 8000

//server
app.listen(port, () => {
    console.log(`App running at ${port}`)
})