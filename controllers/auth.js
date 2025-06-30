const User = require("../models/user");
const jwt = require("jsonwebtoken");




const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = "This email is already registered";
    return errors;
  }

  // Validation errors from Mongoose
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

// create a token
const maxAge = 3 * 24 * 60 * 60;
// id => is payload
const createToken = (id) => {
  return jwt.sign({ id }, "ahmed secret", {
    expiresIn: maxAge,
  });
};

exports.postSignup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    //save token in the cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({ user: user._id });
    console.log("created !");
  } catch (err) {
    const errors=handleErrors(err);
    res.status(404).json({errors})
  }
};

exports.postLogin = (req, res, next) => {
  // const { email, password } = req.body;
  // console.log(email, password);
  res.send("login");
};
