exports.getLogin = (req, res, next) => {
  res.render("login");
};
exports.getSignup = (req, res, next) => {
  res.render("signup");
};
exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("login");
};
exports.postSignup = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send("login");
};
