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

// Get all trucks so their positions can be added to the map
router.get('/api/trucks',(req,res)=>{
  Owners.find(req.query)
    .then(owners=>{
      var truckArray=[]
      owners.forEach(owner=>{
        owner.foodtrucks.map(truck=>{
          truckArray.push(truck)
        })
      })
      res.status(200).send(truckArray)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// Get owners trucks
router.get('/api/owner/:id/trucks', (req,res)=>{
  Owners.findById(req.params.id)
  .then(owner=>{
    res.status(200).send(owner.foodtrucks)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
})

// Add a truck to an owner
router.put('/api/owners/:id/trucks', (req, res) => {
  Owners.findById(req.params.id)
    .then(owner => {
      owner.foodtrucks.addToSet(req.body)
      owner.save()
        .then(() => {
          console.log("Successfully Added Truck")
          res.status(200).send(owner.foodtrucks)
        })
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Edit Truck (Replaces entire Owner array)
router.put('/api/owners/:id', (req, res) => {
  Owners.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(owner => {
      res.status(200).send({message: "Successfully updated owner info"})
    })
    .catch(err => {
      res.status(400).send({message: "Invalid Username or Password"})
    })
})

// Delete Owner
router.delete('/api/owners/:id/', (req, res) => {
  Owners.findByIdAndRemove(req.params.id)
    .then(data => {
      res.send("Successfully Deleted Owner")
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Delete Truck
router.delete('/api/owner/:id/trucks/:truckid', (req, res) => {
  Owners.findById(req.params.id)
    .then(owner => {
      var truck = owner.foodtrucks.id(req.params.truckid)
      truck.remove()
      owner.save()
      .then(() =>{
        res.send("Successfully Deleted Truck")
      })
      .catch(err => {
        res.status(400).send(err)
      })
    })
})
module.exports = { router }