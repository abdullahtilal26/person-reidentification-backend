const { IsAdminEmail } = require("../services/authRoleService");

const validRole = async (req, res, next) => {
  let email = req.user.email;
  if (!(await IsAdminEmail(email))) {
    res.status(400).json({ message: "Access Restricted", status: false });
    return;
  }
  next();
};
module.exports = { validRole };
