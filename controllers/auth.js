exports.signup = (req, res, next) => {
    console.log('REQ BODY', req.body)
    res.json({
        message: 'signup works!'
    })
}

exports.logout = (req, res, next) => {
    res.json({
        message: 'logout works!'
    })
}