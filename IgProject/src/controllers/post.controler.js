const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
const { json } = require("express");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT,
});
console.log(process.env.IMAGE_KIT);

async function postCreate(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.Token;

  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Token not Provide, Unauthrized acess",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.Token);
  } catch (error) {
    return res.status(401).json({
      message: "User Not unAuthrised",
    });
  }

  // console.log(decoded);

  const file = await imagekit.files.upload({
    file: await ImageKit.toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-igProject",
  });

  const { caption } = req.body;

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "Post Created SuccessFully",
    post,
  });
}

async function getPostControllers(req, res) {
  const token = req.cookies.Token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrised Access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.Token);
  } catch (error) {
    return res.status(401).json({
      message: "Token Invalid",
    });
  }

  console.log("Decode", decoded);

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts Fetch SuccessFully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const token = req.cookies.Token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrised Access",
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.Token);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthrised Person",
    });
  }

  const userId = decoded.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  const isvalid = post.user.toString() === userId;

  if (!isvalid) {
    return res.status(403).json({
      message: "Forbiden Content",
    });
  }

  res.status(200).json({
    message: "Post Succesfully Fetch",
    post,
  });
}

module.exports = {
  postCreate,
  getPostControllers,
  getPostDetails,
};
