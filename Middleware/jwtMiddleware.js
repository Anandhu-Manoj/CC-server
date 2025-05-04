const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    const Token = req.headers["authorization"].split(" ")[1];
    const verifyToken = jwt.verify(Token, process.env.JWTSECRETKEY);

    req.userId = verifyToken.userId;

    next();
  } else {
    res.status(400).json("Token required");
  }
};

module.exports = auth;
