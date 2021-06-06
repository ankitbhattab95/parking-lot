const seed = []
for (let i = 0; i < 120; i++) {
  if (i < 24) {
    seed.push({
      status     : "available",
      forReserved: true,
      userId     : null,
      bookingTime: null
    })
  } else {
    seed.push({
      status     : "available",
      forReserved: false,
      userId     : null,
      bookingTime: null
    })
  }
}
module.exports = {
  async up(db, client) {
    await db.collection("Parking").insertMany(seed)
  },

  async down(db, client) {
    await db.collection("Parking").deleteMany({})
  }
}
