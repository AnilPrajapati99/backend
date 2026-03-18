const express = require("express");
const postControler = require("../controllers/post.controler");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { postCreate, getPostControllers, getPostDetails } = postControler;

postRouter.post("/", upload.single("image"), postCreate);

//  get / api / posts / Protected

postRouter.get("/", getPostControllers);

//Get / api / Post / details / :postid
//  return an detail about specific post with the id also check wheathe the post belongs to the user that request come from

postRouter.get("/details/:postId", getPostDetails);

module.exports = postRouter;
