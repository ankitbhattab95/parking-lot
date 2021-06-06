const UserService = require("../services/user-service")
const userService = new UserService()

exports.create = async (req, res) => {
  try {
    const result = await userService.create(req.body)
    res.send(result)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers(req.body)
    res.send(result)
  } catch (err) {
    res.status(400).send({ error: err })
  }
}
