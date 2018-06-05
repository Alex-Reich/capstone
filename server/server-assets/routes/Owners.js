var router = require('express').Router()
var Owners = require('../models/owner')
var session = require('../../auth/session')

// Get Trucks
router.get('/api/owners/trucks/:id?', (req, res) => {
  if (req.params.id) {
    Owners.findById(req.params.id)
      .then(playlist => {
        return res.status(200).send(playlist)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  }
}
// Create New Truck

// Edit Truck

// Delete Truck


module.exports = {
    router
  }