const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.getSignup = (req, res, next) => {
  res.render("signup");
};

exports.postSignup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
    console.log('created !')
  } catch (err) {
    console.log(err.message,err.code,err.name);
    //console.log(err.properties);
    res.status(404).send("user not created");
  }
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("login");
};
