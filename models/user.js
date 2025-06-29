const { isEmail } = require("validator");

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

userSchema.post("save", function (doc, next) {
  console.log("new user saved", doc);
  next();
});
userSchema.pre("save", function ( next) {
    //this.
  console.log("befor saving",this);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
