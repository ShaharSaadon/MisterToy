require('dotenv').config()

module.exports = {
  dbURL: process.env.ATLAS_URL,
  dbName: process.env.ATLAS_DB_NAME,
  // dbURL: "mongodb+srv://mister_toy:shahar1234@cluster0.qxhbqur.mongodb.net/?retryWrites=true&w=majority",
  // dbName: "toy_db"

}

