const express = require("express");
const postControler = require("../controllers/post.controler");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

const { postCreate, getPostControllers, getPostDetails, likePostControler } =
  postControler;

// Post /api/post [Protected]
postRouter.post("/", upload.single("image"), identifyUser, postCreate);

//  get / api / post / Protected

postRouter.get("/", identifyUser, getPostControllers);

//Get / api / Post / details / :postid
//  return an detail about specific post with the id also check wheathe the post belongs to the user that request come from

postRouter.get("/details/:postId", identifyUser, getPostDetails);

// POST /api/post/like/:postId
// Like a post

postRouter.post("/likes/:postId", identifyUser, likePostControler);

module.exports = postRouter;
