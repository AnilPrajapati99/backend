const postModel = require("../model/post.model");
const imageKit = require("@imagekit/nodejs");

// const imagekit = new imageKit({
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
// });
console.log(process.env.IMAGEKIT_PRIVATE_KEY);
async function postCreate(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.file.upload({
    file: await imageKit.toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });
  res.send(file);
}
module.exports = {
  postCreate,
};
