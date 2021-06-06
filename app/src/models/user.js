// Require Mongoose
const mongoose = require("mongoose")

// Define a schema
const Schema = mongoose.Schema

const user = new Schema({
  name    : String,
  age     : Number,
  reserved: Boolean
})

const User = mongoose.model("User", user, "User")

module.exports = User
