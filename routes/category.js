const express = require('express')
const router = express.Router()

const {isAdmin, isAuthenticated, isSignedIn} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getCategoryById, createCategory, getAllCategories, getCategory} = require('../controllers/category')

//params
router.param('userId', getUserById)
router.param('categoryId', getCategoryById)

//routes
router.post('/category/create/:userId', isSignedIn, isAuthenticated, isAdmin, createCategory)

router.get('/categories', getAllCategories )
router.get('/category/:categoryId', getCategory )

module.exports = router