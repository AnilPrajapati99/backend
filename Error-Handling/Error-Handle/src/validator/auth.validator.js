import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    message: errors.array(),
  });
};

export const registerValidator = [
  body("username").isString().withMessage("Username Should be String"),
  body("email").isEmail().withMessage("Email Sjould be Valid Email"),
  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("password SHould be 6 Character"),
  validate,
];
