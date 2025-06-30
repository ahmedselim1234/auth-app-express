const User = require("../models/user");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.message === 'incorrect email') {
    errors = { email:'you are not registered', password: "" };
   // errors.email = 'you are not registered';
  }

  if (err.message === 'incorrect password') {
    errors = { email:'', password: 'this password is not correct' };
    
    //errors.password = 'this password is not correct';
  }

  // Duplicate email error
  // if (err.code === 11000) {
  //   errors.email = "This email is already registered";
  //   errors.password = '';
  //   return errors;
  // }

  // Validation errors from Mongoose
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};


// const handleErrors = (err) => {
//   console.log(err.message,err.code)
//   let errors = { email: "", password: "" };

//   if(err.message==='incorrect email'){
//     errors.email='you are not registerd'
//     //errors.email=err.message;
//   }

//   if(err.message==='incorrect password'){
//     errors.password='this password is not correct'
//     //errors.password=err.message
//   }

//   // Validation errors from Mongoose
//   if (err.message.includes("User validation failed")) {
//     Object.values(err.errors).forEach(({ properties }) => {
//       errors[properties.path] = properties.message;
//     });
//   }

//   return errors;
// };

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
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // if user not found by loin function error will happend
    const user = await User.login(email, password);
    const token = createToken(user._id);
    //save token in the cookie
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors=handleErrors(err);

    res.status(400).json({errors});
  }
};
