require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect( process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log('Database connected')
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`App running at ${port}`)
})