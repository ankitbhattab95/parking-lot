const ParkingService = require("../services/parking-service")
const parkingService = new ParkingService()

exports.get = async (req, res) => {
  try {
    const result = await parkingService.get(req.query.available)
    res.send(result)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.bookParking = async (req, res) => {
  try {
    const result = await parkingService.bookParking(req.body.userId)
    res.send(result)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.occupyParking = async (req, res) => {
  try {
    const result = await parkingService.occupyParking(req.body.userId)
    res.send(result)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}
