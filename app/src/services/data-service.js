class DataService {
  static create(model, body) {
    return model.create(body)
  }

  static get(model, query) {
    return model.find(query)
  }

  static findOne(model, query) {
    return model.findOne(query)
  }

  static updateOne(model, query, body) {
    return model.findOneAndUpdate(query, body, { new: true })
  }

  static findOneAndPopulate(model, query, populate) {
    return model.findOne(query).populate(populate)
  }

  static findAndPopulate(model, query, populate) {
    return model.find(query).populate(populate)
  }
}
module.exports = DataService
