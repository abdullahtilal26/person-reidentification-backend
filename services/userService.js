const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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

const getUserPassword = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) return null;
  return user ? user.dataValues.password : null;
};

const getAllUsers = async () => {
  const users = await User.findAll().catch(errorHandler);
  return users ? users : null;
}

const sendEmail = async (
  hostEmail,
  hostPassword,
  userEmail,
  subject,
  message
) => {
  return new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: hostEmail, // generated ethereal user
        pass: hostPassword, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    console.log("Admin Email: ", hostEmail);
    console.log("Password: ", hostPassword);
    // send mail with defined transport object
    let information = transporter.sendMail(
      {
        from: hostEmail, // sender address
        to: userEmail, // list of receivers
        subject: subject, // Subject line
        text: message, // plain text body
      },
      (err, info) => {
        if (err) {
          console.log("Handshake Error: ", err);
          return reject({ status: false });
        } else {
          console.log(info.response);
          return resolve({ status: true });
        }
      }
    );
  });
};

module.exports = { createUser, getUserByEmail, sendEmail, getAllUsers};
