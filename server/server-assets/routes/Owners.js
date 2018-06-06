var router = require('express').Router()
var Owners = require('../models/owner')
var session = require('../../auth/session')

// Get All Owners, to get Trucks
router.get('/api/owners', (req, res) => {
  Owners.find(req.query)
  .then(owners => {
      res.status(200).send(owners)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Add a truck to an owner, maybe revisit
// router.put('/api/owners/:id/trucks', (req, res) => {
//   Owners.findById(req.params.id)
//     .then(function (owner) {
//       owner.foodtrucks.addToSet(req.body)
//       owner.save()
//         .then(() => {
//           console.log("Successfully Updated ", owner)
//           res.status(200).send(owner)
//         })
//     })
//     .catch(err => {
//       res.status(400).send(err)
//     })
// })

// Edit Truck (Replaces entire Owner array)
router.put('/api/owners/:id', (req, res) => {
  Owners.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(owner => {
    res.send(owner)
  })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Delete Truck
router.delete('/api/owners/:id', (req,res)=>{
  Owners.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send("Successfully Deleted Owner")
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

module.exports = { router }