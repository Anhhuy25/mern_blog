const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "4h",
  });
}

module.exports = generateAccessToken;
