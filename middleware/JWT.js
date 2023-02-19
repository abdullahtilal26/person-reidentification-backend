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
    console.log("ValidToken: ", validToken);
    if (validToken) {
      req.user = validToken;
      console.log("UserBody: ", req.user);
      return next();
    }
  } catch (err) {
    console.log(err)
    return res
      .status(400)
      .json({ message: "Authentication Failed", status: false });
  }
};

module.exports = { createToken, validateToken };
