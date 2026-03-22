const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.Token;

  console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Token not Provide, Unauthrized acess",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.Token);
  } catch (error) {
    return res.status(401).json({
      message: "User Not unAuthrised",
    });
  }
  req.user = decoded;
  next();
}

module.exports = identifyUser;
