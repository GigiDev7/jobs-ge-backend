const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleError = (err) => {
  let errors = {};
  if (err.code === 11000) {
    errors.message = "Email already exists";
  }

  errors.email = err?.errors?.email?.message;
  errors.password = err?.errors?.password?.message;

  return errors;
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });
    res.status(201).json({ id: newUser._id, email: newUser.email });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

module.exports = {
  signUp,
};
