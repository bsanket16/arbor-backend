const Product = require('../models/product')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err){
            return res.status(400).json({
                error : 'Product not found'
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : 'Problem with image'
            })
        }

        const {name, description, price, category, stock} = fields
        
        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error : 'Please include all fields'
            })
        }

        let product = new Product(fields)
        
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : 'File size too big'
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type 
        }

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error : 'Saving in DB failed'
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error : 'Failed to delete the product'
            })
        }
        res.json({
            message : 'Deletion successful',
            deletedProduct
        })
    })
}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error : 'Problem with image'
            })
        }

        let product = _.extend(product, fields)
        
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : 'File size too big'
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type 
        }

        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error : 'Updation failed'
                })
            }
            res.json(product)
        })
    })
}