const express = require('express')
const router = express.Router()

const {isSignedIn, isAuthenticated, isAdmin} = require('../controllers/auth')
const {getUserById, getUser} = require('../controllers/user')

router.param('userId', getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)

// router.get('/users', getAllUsers)

module.exports = router