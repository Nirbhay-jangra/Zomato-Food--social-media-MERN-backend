const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Read token from the cookie parser
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ authenticated: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to the request object
    next(); // Pass control to the next function (your /me route handler)
  } catch (err) {
    return res.status(401).json({ authenticated: false, message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;