const Parking = require("../models/parking")
const User = require("../models/user")
const DataService = require("./data-service")
const messages = require("../config/messages")
const parkingStatus = messages.status

class ParkingService {
  async get(status) {
    try {
      let query
      if (status === "true") {
        query = { status: parkingStatus.available }
      } else {
        query = { status: { $ne: parkingStatus.available } }
      }
      return await DataService.get(Parking, query)
    } catch (err) {
      throw err.errors || err
    }
  }

  async bookParking(userId) {
    try {
      let availableParking
      let booked
      await checkAlreadyBooked(userId)

      const user = await getUserDetails(userId)
      if (user.reserved) {
        ({ availableParking, booked } = await bookForReservedUser(userId, availableParking, booked))
      } else {
        booked = await bookForGeneralUser(booked, userId)
      }
      return booked
    } catch (err) {
      throw err.errors || err
    }
  }

  async occupyParking(userId) {
    try {
      return await DataService.updateOne(Parking, { userId }, { status: parkingStatus.occupyParking })
    } catch (err) {
      throw err.errors || err
    }
  }
}
module.exports = ParkingService

async function getUserDetails(userId) {
  return await DataService.findOne(User, { _id: userId })
}

async function bookForGeneralUser(booked, userId) {
  booked = await DataService.updateOne(Parking, { status: parkingStatus.available, forReserved: false },
    { bookingTime: Date.now(), userId, status: parkingStatus.booked })
  return booked
}

async function bookForReservedUser(userId, availableParking, booked) {
  availableParking = await getOneAvailableReservedParking()
  if (availableParking) {
    booked = await bookAvailableReservedParking(booked, availableParking, userId)
  } else {
    booked = await bookAvailableGeneralParking(userId)
    if (!booked) {
      const data = await getBookedByGeneralUser()
      let parking = null
      for (let i = 0; i < data.length; i++) {
        if (!data[i].userId.reserved) {
          parking = data[i]
          break
        }
      }
      if (parking) {
        booked = await reassignParkingToReservedUser(booked, parking, userId)
      } else {
        booked = messages.apiResponse.allBooked
      }
    }
  }
  return { availableParking, booked }
}

async function reassignParkingToReservedUser(booked, parking, userId) {
  booked = await DataService.updateOne(Parking, { _id: parking._id },
    { bookingTime: Date.now(), userId, status: parkingStatus.booked })
  return booked
}

async function getBookedByGeneralUser() {
  return await DataService.findAndPopulate(Parking, { status: parkingStatus.booked }, "userId")
}

async function bookAvailableGeneralParking(userId) {
  return await DataService.updateOne(Parking, { $or: [{ status: parkingStatus.available }] },
    { bookingTime: Date.now(), userId, status: parkingStatus.booked })
}

async function bookAvailableReservedParking(booked, availableParking, userId) {
  booked = await DataService.updateOne(Parking, { _id: availableParking._id },
    { bookingTime: Date.now(), userId, status: parkingStatus.booked })
  return booked
}

async function getOneAvailableReservedParking() {
  return await DataService.findOne(Parking, { status: parkingStatus.available, forReserved: true })
}

async function checkAlreadyBooked(userId) {
  if (await DataService.findOne(Parking, { userId })) {
    throw new Error(messages.apiResponse.alreadyBooked)
  }
}
