const jwt = require("jsonwebtoken");

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
}

module.exports = generateRefreshToken;
