const postModel = require("../model/post.model");
const likeModel = require("../model/like.model");
const ImageKit = require("@imagekit/nodejs");

require("dotenv").config();

const imagekit = new ImageKit({
  privateKey: process.env.IMAGE_KIT,
});

async function postCreate(req, res) {
  // console.log(decoded);

  console.log(req.user);

  const file = await imagekit.files.upload({
    file: await ImageKit.toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "cohort-2-igProject",
  });

  const { caption } = req.body;

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created SuccessFully",
    post,
  });
}

async function getPostControllers(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts Fetch SuccessFully",
    posts,
  });
}

async function getPostDetails(req, res) {
  const userId = req.user.id;
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

async function likePostControler(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post Not Found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    mesage: "Post Liked Succfully",
    like,
  });
}
async function unlikePostControler(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (!isLiked) {
    return res.status(400).json({
      message: "Post Did'nt like",
    });
  }
  await likeModel.findOneAndDelete({ _id: isLiked._id });

  return res.status(200).json({
    message: "Post Unlike ",
  });
}

async function getFeedControler(req, res) {
  const user = req.user;
  const posts = await Promise.all(
    (await postModel.find().populate("user").sort({ _id: -1 }).lean()).map(
      async (post) => {
        const isliked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });
        post.isliked = Boolean(isliked);
        return post;
      },
    ),
  );

  res.status(200).json({
    message: "Posts Fetched Succesfully",
    posts,
  });
}

module.exports = {
  postCreate,
  getPostControllers,
  getPostDetails,
  likePostControler,
  getFeedControler,
  unlikePostControler,
};
