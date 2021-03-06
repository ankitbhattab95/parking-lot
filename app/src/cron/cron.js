const { schedule } = require("node-cron")
const Parking = require("../models/parking")
const DataService = require("../services/data-service")
const parkingStatus = require("../config/messages").status

exports.cron = async () => {
  schedule("* * * * *", async () => {
    console.log(">....cron started")
    const data = await DataService.get(Parking, {})
    const availableParking = await DataService.get(Parking, { status: parkingStatus.available }, { _id: 1 })
    for (let i = 0; i < data.length; i++) {
      if (data[i].bookingTime) {
        const timeDiffInMin = (Date.now() - data[i].bookingTime) / 1000 / 60
        const waitTime = getWaitTime(availableParking, data)
        console.log(">.......waitTime", waitTime)
        if (timeDiffInMin > waitTime && data[i].status === parkingStatus.booked) {
          await markParkingAvailableForBooking(data, i)
        }
      }
    }
  })
}

async function markParkingAvailableForBooking(data, i) {
  await DataService.updateOne(Parking, { _id: data[i]._id },
    { userId: null, bookingTime: null, status: parkingStatus.available })
}

function getWaitTime(availableParking, data) {
  let waitTime = null
  if (availableParking.length <= data.length / 2) {
    waitTime = 15
  } else {
    waitTime = 30
  }
  return waitTime
}
