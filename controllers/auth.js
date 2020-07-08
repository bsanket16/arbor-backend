const User = require('../models/user')

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: 'Not able to store user in database'
            })
        }
        res.json({
            name : user.name,
            email : user.email,
            id : user._id
        })
    })
}

exports.logout = (req, res) => {
    res.json({
        message: 'logout works!'
    })
}