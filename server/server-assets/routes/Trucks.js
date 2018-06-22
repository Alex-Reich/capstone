var router = require('express').Router()
var Owners = require('../models/owner')

// Get all trucks so their positions can be added to the map
router.get('/api/trucks', (req, res) => {
  Owners.find(req.query)
    .then(owners => {
      var truckArray = []
      owners.forEach(owner => {
        owner.foodtrucks.map(truck => {
          truckArray.push(truck)
        })
      })
      res.status(200).send(truckArray)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = { router }