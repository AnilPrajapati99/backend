import blackListModel from "../models/blacklist.model.js";
import userModel from "../models/user.model.js";
import redis from "../config/cache.js";
import jwt from "jsonwebtoken";

export async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provide",
    });
  }

  const isTokenBlacklistning = await redis.get(token);

  if (isTokenBlacklistning) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    console.log(req.user);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "INvalid Token",
    });
  }
}
