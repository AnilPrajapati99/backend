const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Databse Is Connected");
  });
}

module.exports = connectToDb;
