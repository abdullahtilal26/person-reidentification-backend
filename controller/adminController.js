const { createUser } = require("../services/userService");

const addUser = async (req, res) => {
  const { user_id, name, email, password } = req.body;
  if (!user_id || !name || !email || !password)
    return res.status(400).json({ message: "Fields are empty", status: false });

  const _user = {
    user_id: user_id,
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

module.exports = { addUser };
