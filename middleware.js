let jwt = require("jsonwebtoken");
const config = require("./config.js");

let checkToken = (req, res, next) => {
  const token = req.header("x-access-token") || req.header("authorization");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: "Token is not valid" }] });
  }
};

module.exports = {
  checkToken: checkToken,
};
