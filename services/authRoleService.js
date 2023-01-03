const db = require("../models");
const Role = db.role;

const errorHandler = (err) => {
  console.log("Error:\n", err);
};

const IsAdminEmail = async (email) => {
  const admin = await Role.findOne({
    where: {
      email: email,
    },
  }).catch(errorHandler);
  return admin ? true : false;
};

const addEmailToRole = async (req, res) => {
  const user = await Role.create({
    email: req.body.email,
  }).catch(errorHandler);
  return res.status(200).json({ message: "Role added", status: true });
};
module.exports = { IsAdminEmail, addEmailToRole };
