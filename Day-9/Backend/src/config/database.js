const mongoose = require("mongoose");

function connectTodb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected Db");
  });
}

module.exports = connectTodb;
