import userModel from "../model/user.model.js";

export const handleRegister = async (req, res) => {
  const { name, age, add, email } = req.body;
  const user = await userModel.create({
    name,
    add,
    email,
    age,
  });

  res.status(200).json({
    message: "User Create  succesfully",
    data: user,
  });
};
