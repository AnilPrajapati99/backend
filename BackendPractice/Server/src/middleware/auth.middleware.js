import jwt from "jsonwebtoken";
import { sendResponse } from "../utlis/response.js";

export const authuser = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      return sendResponse(res, 400, "First Login");
    }
    const decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded.id;
    next();
  } catch (error) {
    return sendResponse(res, 400, "Error ocured", { error: error.message });
  }
};
