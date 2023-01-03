const {
  createUser,
  sendEmail,
  getUserByEmail,
} = require("../services/userService");

const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Fields are empty", status: false });

  const _user = {
    name: name,
    email: email,
    password: password,
  };

  const user = await createUser(_user);
  if (!user) {
    return res
      .status(400)
      .json({ message: "User Already Exist", status: false });
  } else {
    return res.status(201).json({ message: "User Created!", status: true });
  }
};

const mailCredentialsToUser = async (req, res) => {
  const { email } = req.body;
  const _user = await getUserByEmail(email);
  if (!_user) {
    return res
      .status(400)
      .json({ message: "User doesnot exist", status: false });
  }
  const userPassword = _user.dataValues.password;
  const subject = "Login Credentials";
  const mailMessage = `${email} your password is ${userPassword}`;

  const mail = await sendEmail(
    process.env.EMAIL,
    process.env.EMAIL_PASSWORD,
    email,
    subject,
    mailMessage
  );
  if (!mail.status) {
    return res
      .status(400)
      .json({ message: "Mail sending failed", status: false });
  } else {
    return res
      .status(200)
      .json({ message: "Mail send successfully", status: true });
  }
};

module.exports = { addUser, mailCredentialsToUser };
