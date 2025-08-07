const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
   role: {
    type: String,
    required: true,
    default:"user",
    enum:["user","admin"]
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});



module.exports = new model ("Usertest",userSchema)