const { isEmail } = require("validator");

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    //email is required  => custom errors
    required: [true, " email is required "],
    unique: true,
    lowercase: [true, "must lowercase"],
    validator: [isEmail, "please enter valid email"],
  },
  password: {
    type: String,
    required: [true, " password is required "],
    minlength: [5, "Password must be at least 5 characters"],
  },
});

//static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
     const auth= await bcrypt.compare(password, user.password);
     if(auth){
      return user
     }
  throw Error("incorrect password");

  }
  throw Error("incorrect email");
};

// userSchema.post("save", function (doc, next) {
//   console.log("new user saved", doc);
//   next();
// });

// hashed password
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
