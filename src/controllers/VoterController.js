const Voter = require('../models/voter');
const authorization = require('../middleware/Authentication');
const bcrypt = require('bcrypt');

class VoterController {
  index(req, res, next) {
    Voter.find({})
      .then(voters => {
        res.json(voters)
      })
      .catch(next)
  }

  login(req, res, next) {
    Voter.findOne({
      email: req.body.email,
    })
    .then(voter => {
      if (voter) {
        if(bcrypt.compareSync(req.body.password, voter.password) && req.body.email === voter.email) {
          res.json({
            status: 'success',
            message: 'voter found',
            data: {
              email: voter.email,
              token: authorization.generateAccessToken({_id: voter._id}),
            },
          })
        }else {
          res.json({
            status: 'error', 
            message: 'Invalid email/password!!!', 
            data: null
          })
        }
      }
      else{
        res.json({
          status: 'error',
          message: 'Account does not exist!!!',
          data: null
        })
      }
    })
    .catch(err =>{
      res.status(500).json({
        message: err.message
      })
    })
  }

  //Tạo mới tài khoản Voter dành cho Company
  create(req, res, next) {
    Voter.create({
      email: req.body.email, 
      password: req.body.password
    })
      .then(voter => {
        res.json({
          status: 'success',
          message: 'Account created successfully',
          data: {
            user_id: voter._id,
            roles: 'voter'
          },
          token: authorization.generateAccessToken({_id: voter._id}),
        })
      })
      .catch(err => res.status(500).json({
        message: err.message
      }))
  }
}

module.exports = new VoterController();
