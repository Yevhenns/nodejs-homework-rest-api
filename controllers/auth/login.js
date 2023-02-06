const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Not authorized, email is wrong");
    error.status = 401;
    throw error;
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    const error = new Error("Not authorized, password is wrong");
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    status: "success",
    code: 200,
    data: { token },
  });
};

module.exports = login;
