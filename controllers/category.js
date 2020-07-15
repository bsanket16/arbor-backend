const Category = require('../models/category')

exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {
        if (err){
            return res.status(400).json({
                error : 'Category not found'
            })
        }
        req.category = cate
        next()
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if (err){
            return res.status(400).json({
                error : 'Not able to save in DB'
            })
        }
        res.json({ category })
    })
}   

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err){
            return res.status(400).json({
                error : 'No categories found'
            })
        }
        res.json(categories)
    })  
}