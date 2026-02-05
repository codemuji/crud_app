const mongoose = require("mongoose");
const env = require("dotenv");

function connectToDb() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB");
  });
}


module.exports = connectToDb