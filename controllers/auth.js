const User = require('../models/user')
const { validationResult } = require('express-validator');

//signup controller
exports.signup = (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : `${errors.array()[0].param} ${errors.array()[0].msg}`
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: 'Not able to store user in database'
            })
        }
        res.json({
            username : user.username,
            email : user.email,
            id : user._id
        })
    })
}

//logout controller
exports.logout = (req, res) => {
    res.json({
        message: 'logout works!'
    })
}