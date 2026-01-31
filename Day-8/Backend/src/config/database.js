const mongoose = require("mongoose");

function connectTodb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Db Connnected");
  });
}

module.exports = connectTodb;
