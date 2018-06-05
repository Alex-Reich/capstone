let router = require('express').Router();
// let Users = require('../server-assets/models/user');
let Owners = require('../server-assets/models/owner');
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

// Login as Owner
router.post('/auth/login', (req, res) => {
  Owners.findOne({
      email: req.body.email
    })
    .then(owner => {
      if (!owner) {
        return res.status(400).send(loginError)
      }
      if (!owner.validatePassword(req.body.password)) {
        return res.status(400).send(loginError)
      }
      delete owner._doc.password
      req.session.uid= owner._id
      res.send(owner)
    }).catch(err => {
      res.status(400).send(loginError)
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
