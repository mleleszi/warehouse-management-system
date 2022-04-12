const jwt = require("jsonwebtoken");

export const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "THIS_SHOULD_BE_LONGER");
    req.userData = { email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
