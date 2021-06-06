module.exports = {
  async up(db, client) {
    await db.createCollection("User", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "age", "reserved"]
        }
      }
    })
  },

  async down(db, client) {
    await db.collection("User").drop()
  }
}
