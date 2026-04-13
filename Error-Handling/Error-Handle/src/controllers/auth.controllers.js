export async function registerUser(req, res, next) {
  res.status(201).json({
    message: "User Create Succesfuly",
  });

  // try {
  //   throw new Error("User already Exists with Same Email");
  //   console.log(user);
  // } catch (err) {
  //   err.status = 409;
  //   next(err);
  // }

  //   res.send("Hello");
}
