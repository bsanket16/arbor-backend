const express = require('express')
const router = express.Router()

const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getCategoryById} = require('../controllers/category')

router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

module.exports = router