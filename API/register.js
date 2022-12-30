const User = require("../models/user");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("../config");
const mongo = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res) {
  try {
    const { email, pwd, userName, mobile, location } = req.body;
    //see if the user exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const user = new User({
      userName,
      email,
      mobile,
      location,
    });

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.pwd = await bcrypt.hash(pwd, salt);

    //Save to DB
    await user.save();

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, config.secret, { expiresIn: 360000 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send("Server error");
  }
};
