var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema
var schemaName = 'Owner'
const SALT = 12
var ObjectId = Schema.Types.ObjectId

var foodtrucksSchema = new Schema({
  name: {type: String, required: true},
  truckPic:{type: String},
  menu: {type: String},
  hours: {type: String},
  // default location to their GPS location
  location: {type: String},
  description: {type: String},
  created:{type:Number, required: true, default: Date.now()},
  parentId: {type: ObjectId, ref:"Owner", required: true}
})


var ownerSchema = new Schema({
  username: {type:String,required:true,unique:true},
  email: {type:String,required: true,},
  password:{type:String,required:true},
  foodtrucks: [foodtrucksSchema],
  created:{type:Number, required: true, default: Date.now()},
  isOwner: {type: Boolean}
})

ownerSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, SALT)
}

ownerSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.hash)
}

ownerSchema.pre('save', function(next){
  this.markModified('foodtrucks')
})

module.exports = mongoose.model(schemaName, ownerSchema)