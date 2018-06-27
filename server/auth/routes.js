let router = require('express').Router();
let Owners = require('../server-assets/models/Owner.js');
let session = require('./session')

let loginError = new Error('Bad Email or Password')

//  Owners

//Register Owner
router.post('/auth/register', (req, res) => {
  if (req.body.password.length < 5) {
    return res.status(400).send({
      error: 'Password must be at least 6 characters'
    })
  }
  req.body.password = Owners.generateHash(req.body.password)
  Owners.create(req.body)
    .then(owner => {
      delete owner._doc.password
      req.session.uid = owner._id
      res.send(owner)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

//Update Pasword
router.post('/auth/updatePassword', (req, res) => {
  if (req.body.password.length < 5) {
    return res.status(400).send({
      error: 'Password must be at least 6 characters'
    })
  }
  req.body.password = Owners.generateHash(req.body.password)
  Owners.findByIdAndUpdate(req.session.uid, req.body)
    .then(owner => {
      owner.validatePassword(req.body.oldpassword)
        .then(valid => {
          if (!valid) {
            return res.status(400).send({ error: 'Invalid Password' })
          }
          delete owner._doc.password
          delete req.body.oldpassword
          req.session.uid = owner._id
          res.send(owner)
        })
        .catch(err => {
          res.status(400).send(err)
        })
    })
})

// Login as Owner
router.post('/auth/login', (req, res) => {
  Owners.findOne({
    username: req.body.username
  })
    .then(owner => {
      owner.validatePassword(req.body.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).send({ error: 'Invalid Email or Password' })
          }
          delete owner._doc.password
          req.session.uid = owner._id;
          //owner.password = null
          res.send({
            message: 'successfully logged in',
            session: req.session.uid,
            data: owner
          })
        })
        .catch(err => {
          res.status(400).send({ message: 'Invalid User or Password' })
        })
    })
    .catch(err => {
      res.status(400).send({ message: 'Invalid User or Password' })
    })
})



// Delete 
router.delete('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send(err)
    }
    return res.send({
      message: 'Logout Successful'
    })
  })
})

// Get Owner
router.get('/auth/authenticate', (req, res) => {
  Owners.findById(req.session.uid)
    .then(owner => {
      if (!owner) {
        return res.status(401).send({
          error: 'Please login to continue'
        })
      }
      delete owner._doc.password
      res.send(owner)
    }).catch(err => {
      res.status(500).send(err)
    })
})

module.exports = {
  router,
  session
}
