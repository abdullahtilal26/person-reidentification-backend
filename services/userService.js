const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;

const errorHandler = (err) => {
  console.log("Error:\n", err);
};

const createUser = async (_user) => {
  const { name, email, password } = _user;

  const _userExist = await getUserByEmail(email);
  if (_userExist) return null;
  
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hashPassword = await bcrypt.hash(password, salt);
  
  const userCreated = await User.create({
    email: email,
    name: name,
    password: hashPassword,
    status: false,
  }).catch(errorHandler);
  return userCreated ? userCreated : null;
};

const getUserByEmail = async (_email) => {
  const user = await User.findOne({
    where: {
      email: _email,
    },
  }).catch(errorHandler);
  console.log(user);
  return user ? user : null;
};

module.exports = { createUser, getUserByEmail };
