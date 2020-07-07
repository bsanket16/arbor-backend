const express = require('express')
const router = express.Router()

router.use('/signout', (req, res) => {
    res.send('<h1>User Logout</h1>')
})

module.exports = router