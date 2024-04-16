const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware must contains next() method
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token,Authorization Denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// mongodb+srv://kusumasrineelapala:kusuma3435@cluster0.is2f106.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0