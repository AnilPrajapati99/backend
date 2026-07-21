import jwt, { decode } from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(accessToken);
  try {
    if (!accessToken) {
      return res.status(400).json({
        message: "Token Not Provide",
      });
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
