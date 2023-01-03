const { IsAdminEmail } = require("../services/authRoleService");

const validRole = async (req, res, next) => {
  let email = req.userEmail;
  if (!(await IsAdminEmail(email))) {
    res.status(400).json({ message: "Access Restricted", status: false });
    return;
  }
  next();
};
module.exports = { validRole };
