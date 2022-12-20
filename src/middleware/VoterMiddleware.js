class VoterMiddleware {
    // Kiểm tra tài khoản Voter nếu chưa tồn tại trước khi đăng kí
    registrationMiddleware(req, res, next) {
        Voter.findOne({ email: req.body.email })
            .then( voter => {
                if(!voter) {
                    return next();
                }
                else {
                    res.json({
                        status: 'error', 
                        message: 'Account already exists!!!', 
                        data: null
                    })
                }
            })
            .catch(err => res.status(500).json({
                message: err.message
            }))
    }

    
}

module.exports = new VoterMiddleware();