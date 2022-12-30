const User = require("../models/user");
let mongoose = require("mongoose");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let config = require("../config");
const mongo = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");

module.exports = async function (req, res) {
  const { userName, pwd } = req.body;
  try {
    //see if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const ismatch = await bcrypt.compare(pwd, user.pwd);
    if (!ismatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

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
      res.json({
        status: true,
        message: "logged in",
        token,
        uid: user.id,
        mobile: user.mobile,
        email: user.email,
        location: user.location,
        userName,
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send("Server error");
  }
};
