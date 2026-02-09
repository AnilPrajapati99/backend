const mongoose = require("mongoose");

function connectToDb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Db is Connected");
  });
}

module.exports = connectToDb;
