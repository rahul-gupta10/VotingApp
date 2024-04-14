const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwt_sig = process.env.JWT_SIGNATURE;

const fetchuser = (req, res, next) => {
  const token = req.header('authtoken');
  if (!token) {
    res.status(401).send("Please login first token not found");
  }
  try {
    const string = jwt.verify(token,jwt_sig);
    req.user = string.id;
    next();
  } catch (error) {
    res.status(401).send("Please login first" + error.message);
  }
};


module.exports = fetchuser;
