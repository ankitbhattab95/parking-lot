// Require Mongoose
const mongoose = require("mongoose")
const status = require("../config/messages").status
// Define a schema
const Schema = mongoose.Schema

const parking = new Schema({
  status     : { type: String, default: status.available, enum: [status.available, status.booked, status.occupied] },
  forReserved: Boolean,
  bookingTime: Date,
  userId     : { type: Schema.Types.ObjectId, ref: "User", required: true, default: null }
})

const Parking = mongoose.model("Parking", parking, "Parking")

module.exports = Parking
