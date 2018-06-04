var mongoose = require('mongoose')
var connectionString = 'mongodb://student:student1@ds155934.mlab.com:55934/capstone-foodtruck'
var connection = mongoose.connection


mongoose.connect(connectionString)

connection.on('error', err=>{
  console.log('ERROR FROM DATABASE: ', err)
})


connection.once('open', ()=>{
  console.log('Connected to Database')
})