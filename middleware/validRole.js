const validRole = (req, res, next) => {
    let email = req.email;
    if (!email.includes("admin")) {
      res.status(400).json({ message: "Access Restricted", status: false });
      return;
    }
    next();
  };
  module.exports = { validRole };
  