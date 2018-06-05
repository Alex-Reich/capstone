var router = require('express').Router()
var Owners = require('../models/owner')
var session = require('../../auth/session')

// Get post push delete

router.get('api/owners/:id', (req, res) =>{
  if (req.params.id) {
    Owners.findById(req.params.id)
    .then(owner => {
        return res.status(200).send(owner)
    })
    .catch(err => {
        res.status(400).send(err)
    })
}
Owners.find({author: req.session.uid})
.then(owners => {
    res.status(200).send(owners)
})
.catch(err => {
    res.status(400).send(err)
})
})

module.exports = {
  router
}