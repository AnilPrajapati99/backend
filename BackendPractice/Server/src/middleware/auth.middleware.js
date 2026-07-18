import { decode } from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  try {
    if (!token) {
      return res.status(400).json({
        message: "Token Not Provide",
      });
    }
    const decoded = decode(token);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
