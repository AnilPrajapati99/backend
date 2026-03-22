const express = require("express");
const userControler = require("../controllers/user.controler");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

const { followUserControler, unfollowUserController } = userControler;

//  post /api/users/follow/:userName
userRouter.post("/follow/:userName", identifyUser, followUserControler);

//post /api/unfolllow/userName

userRouter.post("/unfollow/:userName", identifyUser, unfollowUserController);

module.exports = userRouter;
