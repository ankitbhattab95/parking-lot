module.exports = {
  async up(db, client) {
    await db.createCollection("Parking", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["status", "forReserved", "userId", "bookingTime"]
        }
      }
    })
  },

  async down(db, client) {
    await db.collection("Parking").drop()
  }
}
