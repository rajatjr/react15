const Users = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


/////////   GET USERS  FROM USER TABLE ///////////////

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
}

/////////   SIGN UP USERS   ///////////////


exports.Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Password and Confirm Password do not match" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      confPassword: confPassword
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
}

/////////   LOGIN  USERS   ///////////////

exports.login = async (req, res) => {
  try {
    console.log("hello", req.body)
    const { email, password } = req.body;
    const user1 = await Users.findOne({ where: { email } })
    if (user1) {
      const cmpPwd = bcrypt.compareSync(password, user1.password);
      if (cmpPwd) {
        const token = jwt.sign({ user: user1 }, "secretkey");
        return res.status(200).json({ success: true, token });
      }
    }
    else {
      const [data, setData] = useState([]);
      res.json({ success: false, msg: "invalid user" })
    }

  } catch (error) {
    console.log(error)
  }
};

/////////   LOGOUT  USERS   ///////////////

exports.Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update({ refresh_token: null }, {
    where: {
      id: userId
    }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}



//////////// FORGET PASSWORD ///////////////

const saltRounds = 10; // Number of salt rounds for hashing

exports.forget = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // 1. Check if the user exists in the database
    const user = await Users.findOne({ where: { email } });
    console.log("user is :", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Generate a random password
    const randomPassword = Math.random().toString(36).slice(-8);
    console.log(randomPassword);

    // 3. Hash the random password before updating the user's password in the database
    const hashedPassword = await bcrypt.hash(randomPassword, saltRounds);

    // 4. Update the user's password in the database with the hashed password
    await Users.update(
      { password: hashedPassword },
      {
        where: {
          email: email,
        },
      }
    );

    // 5. Send the random password to the user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rajatpant18@gmail.com',
        pass: 'qetrcbimsvompiyw',
      },
    });

    const mailOptions = {
      from: 'rajatpant18@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Your new password is: ${randomPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.log('Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


/////////   CHANGE PASSWORD FOR  USERS   ///////////////

exports.changepassword = async (req, res) => {
  const { email, password, newPassword, confirmPassword } = req.body;
  console.log(email)
  const user1 = await Users.findOne({ where: { email } });
  console.log("user:", user1)
  if (user1) {

    // Check if the current password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user1.password);
    console.log(isPasswordValid)
    if (isPasswordValid) {
      if (newPassword === confirmPassword) {

        // Hash the new password before saving it to the database
        const hashedPassword = await bcrypt.hash(newPassword, 10); // The second argument is the saltRounds

        // Update the user's password in the database
        user1.password = hashedPassword;
        await user1.save();

        // Issue a new JWT token with the updated user data (optional)
        const token = jwt.sign({ token1: user1 }, "secretkey");

        return res.status(200).json({ success: true, msg: "Password changed successfully!", token });
      } else {
        return res.status(400).json({ success: false, msg: "New password and confirmation password do not match." });
      }
    } else {
      return res.status(401).json({ success: false, msg: "Invalid Email or Password" });
    }
  } else {
    return res.status(401).json({ success: false, msg: "Invalid Email or Password" });
  }
};
