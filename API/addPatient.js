let Patient = require("../models/patients");
let mongoose = require("mongoose");
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let config = require("../config");
const mongo = require("mongodb").MongoClient;

module.exports = async function (req, res) {
  try {
    const { fname, lname, gender, dob, mobile, email, desc, userId } = req.body;
    console.log(req.userId);
    const patient = new Patient({
      fname,
      lname,
      gender,
      dob,
      mobile,
      email,
      desc,
      userId: req.userId.id,
    });
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    console.error(error);
    return res.status(400).send("Server error");
  }
};
