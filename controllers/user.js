const User = require('../models/user')
const { Result } = require('express-validator')
const user = require('../models/user')

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error : 'No User Found'
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req, res) => {
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    req.profile.__v = undefined
    return res.json(req.profile)
}

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.json({
                error : 'No User Found'
            })
        }
        res.json(users)
    })
}