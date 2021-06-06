const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller")
const parkingController = require("../controllers/parking-controller")

router.post("/user", userController.create)
router.get("/user", userController.getAllUsers)

router.get("/parking", parkingController.get)
router.post("/parking/book", parkingController.bookParking)
router.post("/parking/occupy", parkingController.occupyParking)

module.exports = router
