var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'Owner'
const SALT = 12
var ObjectId = Schema.Types.ObjectId

// Food Truck 
var foodtrucksSchema = new Schema({
  name: {type: String, required: true},
  truckPic:{type: String},
  menu: {type: String},
  hours: {type: String},
  foodType: {type: String},
  // default location to their GPS location
  location: {type: String},
  description: {type: String},
  rating: {type: String, required: true, default: 0},
  value:{type: String, required: true, default: 0},
  created:{type:Number, required: true, default: Date.now()},
  parentId: {type: ObjectId, ref:"Owner", required: true}
})

// Owner
var ownerSchema = new Schema({
  username: {type:String,required:true,unique:true},
  email: {type:String,required: true,},
  password:{type:String,required:true},
  foodtrucks: [foodtrucksSchema],
  created:{type:Number, required: true, default: Date.now()}
})

ownerSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

ownerSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}

ownerSchema.pre('save', function(next){
  this.markModified('foodtrucks')
  next()
})

module.exports = mongoose.model(schemaName, ownerSchema)