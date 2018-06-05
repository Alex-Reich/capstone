var router = require('express').Router()
var Owners = require('../models/owner')
var session = require('../../auth/session')

// Get All Trucks
router.get('/api/owners/trucks', (req, res) => {
  Owners.find(req.query)
  .then(owners=>{
    res.status(200).send(owners)
  })
  .catch(err=>{
    res.status(400).send(err)
  })
})

// Add a truck to an owner
router.put('/api/owners/:id/trucks', (req,res)=>{
  Owners.findById(req.params.id)
    .then(function(playlist){
      playlist.songs.addToSet(req.body)
      playlist.save()
        .then(()=>{
          console.log("Successfully Updated ", playlist)
          res.status(200).send(playlist)
        })
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// Edit Truck

// Delete Truck


module.exports = { router }