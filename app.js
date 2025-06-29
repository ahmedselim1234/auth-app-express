const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");


const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json())

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
  .then((result) =>{app.listen(3000);
    console.log('connected to db!')
  } )
  .catch((err) => console.log("not connected to db!"));

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
