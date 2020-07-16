const express = require('express')
const router = express.Router()

const { getProductById, createProduct } = require('../controllers/product')
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth')
const { getUserById } = require('../controllers/user')

//params
router.param('userId', getUserById)
router.param('productId', getProductById)

//routers
router.post('/product/create/:userId', isSignedIn, isAuthenticated, isAdmin, createProduct)

module.exports = router