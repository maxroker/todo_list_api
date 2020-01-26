const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


exports.users_register = (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              username: req.body.username
            });

            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User created',
                })
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                })
              });
          }
        });
      }
    })
    .catch();
  
};


exports.users_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return result.status(401).json({
              message: 'Auth failed'
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              }, 
              process.env.JWT_KEY,
              {
                expiresIn: '24h'
              }
            );
            return res.status(200).json({
              message: 'Auth successful',
              id: user[0]._id,
              token: token
            });
          }
          res.status(401).json({
            message: 'Auth failed'
          })
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
};



exports.users_me = (req, res, next) => {
  res.status(200).json({
    message: 'Auth successful',
    id: req.userData.userId,
    token: req.headers.authorization
  });
};


exports.users_delete = (req, res, next) => {
  User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
};