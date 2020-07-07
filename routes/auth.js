const express = require('express')
const router = express.Router()
const { logout, signup } = require('../controllers/auth')

router.post('/signup', signup)
router.get('/logout', logout)

module.exports = router