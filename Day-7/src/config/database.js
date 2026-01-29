const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connect To DataBase");
    })
    .catch((err) => {
      console.log("Error" + err);
    });
}

module.exports = connectToDb;
