const express = require("express");
const postControler = require("../controllers/post.controler");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const { postCreate } = postControler;

postRouter.post("/", upload.single("image"), postCreate);

module.exports = postRouter;
