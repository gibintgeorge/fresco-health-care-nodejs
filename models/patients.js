var mongoose = require("mongoose");

var schema = mongoose.Schema;

const patientSchema = new schema(
  {
    fname: String,
    lname: String,
    gender: String,
    dob: Date,
    mobile: Number,
    email: String,
    desc: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("patientDetails", patientSchema);
