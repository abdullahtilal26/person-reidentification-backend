const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/JWT");
const { getUserByEmail } = require("../services/userService");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Fields are empty", status: false });

  const user = await getUserByEmail(email);

  if (user) {
    await bcrypt.compare(password, user.dataValues.password);
    const accessToken = createToken(email);
    res.cookie("authToken", accessToken, {
      maxAge: 180000,
      httpOnly: true,
      secure: false,
    });
    return res.status(200).json({ message: "Login Successful!", status: true });
  } else {
    return res
      .status(400)
      .json({ message: "User doesnot exist", status: false });
  }
};

const logout = (req, res) => {
  if (req.cookies.authToken) {
    res.clearCookie("authToken");
    return res.status(200).json({ status: true });
  }
  return res.status(400).json({ status: false });
};

module.exports = { login, logout };
