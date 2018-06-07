var router = require('express').Router()
let axios = require('axios')
// import axios from 'axios'

var google = axios.default.create({
  baseURL: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
  timeout: 3000,
  withCredentials: true
})

var apiKey = '&key=AIzaSyCp89R6XqYSrTub4SbaoOnKj2IQ-iC2RoU'

router.post('/api/google',(req,res,next)=>{
  console.log(req.body.query+apiKey)
  google.get(req.body.query+apiKey)
    .then(map=>{
      console.log('Success:', map)
      res.send(map)
    })
    // .catch(err=>{
    //   console.log('Went to Google catch')
    //   res.status(400).send(err)
    // })
})

// required params:{
//   location,radius, rankby=distance optional param
// }

module.exports={router}