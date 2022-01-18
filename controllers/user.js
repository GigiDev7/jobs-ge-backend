const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleError = (err) => {
  let errors = {};
  if (err.code === 11000) {
    errors.message = "Email already exists";
  }

  errors.email = err?.errors?.email?.message;
  errors.password = err?.errors?.password?.message;

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 24 * 60 * 60 });
};

const signUp = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const newUser = await User.create({ email, password, firstname, lastname });
    const token = createToken(newUser._id);
    res.status(200).json({
      id: newUser._id,
      email: newUser.email,
      token,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
    });
  } catch (error) {
    const errors = handleError(error);
    res.status(400).json(errors);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user with such email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password" });
    }

    const token = createToken(user._id);
    res
      .status(200)
      .json({
        id: user._id,
        email: user.email,
        token,
        firstname: user.firstname,
        lastname: user.lastname,
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  signUp,
  login,
};
