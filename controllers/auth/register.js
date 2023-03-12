const { User } = require("../../models");
const { sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const error = new Error("Email in use");
    error.status = 409;
    throw error;
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Verify email",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };
  await sendEmail(mail);
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: result,
    },
  });
};

module.exports = register;
