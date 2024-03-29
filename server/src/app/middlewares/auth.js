const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ success: false, msg: "Token is not valid!" });
      }

      req.user = decoded.id; // decoded là cái được đưa vào bên cạnh secret key chỗ accessToken
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
}

module.exports = verifyToken;
