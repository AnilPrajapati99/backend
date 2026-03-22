const mongoose = require("mongoose");

async function connectTodb() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connect To Database");
}

module.exports = connectTodb;
