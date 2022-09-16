const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
var nodemailer=require("nodemailer")
const jwt = require("jsonwebtoken");
require("../database/conn");
const authenticate = require("../middleware/authenticate");
const User = require("../models/userSchema");
require("../config.env");
//====================================================== asycronus javascript =========================================
router.post("/signup", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "data is not inserted" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log("me email chal gya");
      return res.status(422).json({ error: "email already exist" });
    } else if (password != cpassword) {
      console.log("me chal gya password vala");
      return res.status(422).json({ error: "recheck password" });
    } else {
      const user = new User({ name, email, phone, password, cpassword });

      // =============================hasing =============================
      await user.save();
      console.log("me chal gya");
      res.status(201).json({ message: "successfully saved." });
    }
  } catch (err) {
    console.log(err);
  }
});

//============================login route ===============================
router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill data" });
    }
    const userlogin = await User.findOne({ email: email });

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      // =====================================  token ============================
      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2589200000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "invaild ho bhia tum" });
      } else {
        res.json({ message: "successfully login h tu bhia khush hoja" });
      }
    } else {
      res.status(400).json({ error: "invaild h bhia tu" });
    }
    // ==============================bycript for login functionality =================================
  } catch (err) {
    console.log(err);
  }
});

//===============================forgot  page============================
router.post("/forgot", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "please fill data" });
  }
  try {
     const userForgot = await User.findOne({ _id: id });
    if (!userForgot) {
      return res.status(400).json({ error: "User Not exists" });
    }
    const secret = SECRET_KEY + userForgot.password;
    const token = jwt.sign(
      { email: userForgot.email, id: userForgot._id },
      secret,
      { expiresIn: "5m" }
    );
    const link = `http://localhost:5000/forgot/${userForgot._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:process.env.EMAIL_MAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset password',
      text:link
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    // res.status(201).json({
    //   link: `http://localhost:5000/forgot/${userForgot._id}/${token}`,
    // });
  } catch (err) {
    console.log(err);
  }
});
router.get("/forgot/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const userForgot = await User.findOne({ _id: id });
  if (!userForgot) {
    return res.json({ status: "NOt recognised" });
  }
  const secret = SECRET_KEY + userForgot.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "not verified" });
  } catch (err) {
    console.log(err);
  }
});
router.post("/forgot/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const userForgot = await User.findOne({ _id: id });
  if (!userForgot) {
    return res.json({ status: "NOt recognised" });
  }
  const secret = SECRET_KEY + userForgot.password;
  try {
    const verify = jwt.verify(token, secret);
    const encrPASS = await bcrypt.hash(password, 12);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encrPASS,
        },
      }
    );
    // res.status(200).json({sucess:"done"})
    res.render("index", { email: verify.email, status: "verified" });
  } catch (err) {
    res.json({ status: "somwthing went wrong" });
    console.log(err);
  }
});
//================ user data for contact us and home   ========================
router.get("/getdata", authenticate, (req, res) => {
  console.log("hello guys swagat ni kroge humara");
  res.send(req.UserRoot);
});
//================= contact us page ===================================

router.post("/transcation", authenticate, async (req, res) => {
  try {
    const { name, header, amount, status } = req.body;
    if (!name || !header || !amount || !status) {
      return res.json({ error: "plzz filled bhar do yrrr" });
    } else {
      const userContact = await User.findOne({ _id: req.userID });
      if (userContact) {
        const userMessage = await userContact.addMessage(
          name,
          header,
          amount,
          status
        );

        await userContact.save();

        res.status(201).json({ message: "successfully saved." });
      }
    }
  } catch (error) {
    console.log(error);
  }
});
// ======================== logout page =================================
router.get("/logout", (req, res) => {
  // console.log("hello i am logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

module.exports = router;
