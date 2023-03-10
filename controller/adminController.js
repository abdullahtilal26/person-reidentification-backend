const {
  createUser,
  sendEmail,
  getUserByEmail,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserRecord,
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

const getUsers = async (req, res) => {
  const usersData = await getAllUsers();
  if (!usersData) {
    return res.status(400).json({ message: "No users found", status: false });
  } else {
    console.log(usersData);
    return res.status(200).json({ message: usersData, status: true });
  }
};

const deleteUser = async (req, res) => {
  const { user_id } = req.body;
  const _userExist = await getUserById(user_id);
  if (!_userExist) {
    return res
      .status(400)
      .json({ message: "User doesnot exist", status: false });
  }

  const deleteUser = await deleteUserById(user_id);
  if (!deleteUser) {
    return res
      .status(400)
      .json({ message: "User delete failed", status: false });
  } else {
    return res
      .status(200)
      .json({ message: "User deleted successfully", status: true });
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.body;
  const _userExist = await getUserById(user_id);
  if (!_userExist) {
    return res
      .status(400)
      .json({ message: "User doesnot exist", status: false });
  }

  const _userUpdated = await updateUserRecord(req.body);
  if (!_userUpdated) {
    return res
      .status(400)
      .json({ message: "User update failed", status: false });
  } else {
    return res
      .status(200)
      .json({ message: "User updated successfully", status: true });
  }
};

module.exports = {
  addUser,
  mailCredentialsToUser,
  getUsers,
  deleteUser,
  updateUser,
};
