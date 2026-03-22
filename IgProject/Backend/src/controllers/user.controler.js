const followModel = require("../model/follow.model");
const userModel = require("../model/user.model");

async function followUserControler(req, res) {
  const followerUsername = req.user.username;

  const followingUsername = req.params.userName;

  if (followerUsername === followingUsername) {
    return res.status(400).json({ message: "You can not following yourSelf" });
  }

  const isFollowingExits = await userModel.findOne({
    username: followingUsername,
  });

  if (!isFollowingExits) {
    return res.status(404).json({
      message: "User you are trying to follow does not exits",
    });
  }

  const isAlredyFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (isAlredyFollowing) {
    return res.status(200).json({
      message: `You are alredy follwing ${followingUsername}`,
      follow: isAlredyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followingUsername,
  });

  res.status(201).json({
    message: `You are Following ${followingUsername}`,
    followRecord,
  });
}
async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.userName;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    following: followingUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followingUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);

  res.status(200).json({
    message: `You Have unfollowed ${followingUsername}`,
  });
}

module.exports = { followUserControler, unfollowUserController };
