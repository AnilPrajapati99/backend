const mongoose = require("mongoose");

function connectTodb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Database is Conncted");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectTodb;
