const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database is Connected Succesfully");
  });
}

module.exports = connectToDb;
