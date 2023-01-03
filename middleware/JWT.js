const jwt = require("jsonwebtoken");

const createToken = (credential) => {
  return jwt.sign(credential, process.env.SECRETKEY);
};

const validateToken = (req, res, next) => {
  let accessToken = req.cookies.authToken;
  console.log(accessToken);
  if (!accessToken) {
    console.log("No cookies");
    return res
      .status(400)
      .json({ message: "Authentication Denied", status: false });
  }
  try {
    const validToken = jwt.verify(accessToken, process.env.SECRETKEY);
    if (validToken) {
      console.log(validToken);
      req.userEmail = validToken;
      console.log(req.userEmail);
      return next();
    }
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Authentication Failed", status: false });
  }
};

module.exports = { createToken, validateToken };
