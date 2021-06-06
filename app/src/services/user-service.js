const User = require("../models/user")
const DataService = require("./data-service")

class UserService {
  async create(body) {
    try {
      return await DataService.create(User, body)
    } catch (err) {
      throw err.errors || err
    }
  }

  async getAllUsers() {
    try {
      return await DataService.get(User, {})
    } catch (err) {
      throw err.errors || err
    }
  }
}
module.exports = UserService
