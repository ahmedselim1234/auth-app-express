const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb+srv://ahmed:ahmed-1@cluster0.jo6xr9w.mongodb.net/ninga";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
    console.log("connected to db!");
  })
  .catch((err) => console.log("not connected to db!"));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

app.get("/set-cookies", (req, res) => {
  //res.setHeader("Set-Cookie", "newUser=true");
  res.cookie('newUser',false)

  // inside {} write any property of cookie
  res.cookie('isEmployee',true,{})
  res.send("this is a cookie");
});

app.get("/read-cookies", (req, res) => {
 console.log(req.cookies)
 res.json(req.cookies)
});
