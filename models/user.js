var mongoose = require("mongoose");

var schema = mongoose.Schema;

const userSchema = new schema({
  userName: String,
  pwd: String,
  mobile: Number,
  email: String,
  location: String,
});

module.exports = mongoose.model("User", userSchema);
