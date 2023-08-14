const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

//Register User

userRoute.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, async function (err, hash) {
      const newUser = new UserModel({ name, email, password: hash });
      await newUser.save();
    });

    res.status(201).send("User registered");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

//Login User
userRoute.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("unauthorized");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(201).send("Log in successfull");
  } catch (error) {
    res.status(400).send("Internal error");
    console.log(error);
  }
});

module.exports = { userRoute };
