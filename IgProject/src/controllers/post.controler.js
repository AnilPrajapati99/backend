const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
require("dotenv").config();

const imagekit = new ImageKit({
  privatekey: process.env.ImageKit_Key,
});
// console.log(process.env.IMAGEKIT_PRIVATE_KEY);
async function postCreate(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.file.upload({
    file: await ImageKit.toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });
  res.send(file);
}
module.exports = {
  postCreate,
};
