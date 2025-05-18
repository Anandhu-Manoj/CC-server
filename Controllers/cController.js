const { request } = require("express");
const jwt = require("jsonwebtoken");

const users = require("../Database/models/userModel");

exports.regCivilianController = async (req, res) => {
  const { username, password, email, address, aadharNo, userType } = req.body;
  const adhaarImg = req.file.filename;
  try {
    const existingUser = await users.findOne({ aadharNo });
    if (existingUser) {
      res.status(409).json("user already exist please login");
    } else {
      const newUser = new users({
        username,
        password,
        adhaarImg,
        address,
        aadharNo,
        userType,
        email,
      });
      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.civilianLogin = async (req, res) => {
  try {
    const { email, password, aadharNo } = req.body;

    const existingUser = await users.findOne({ email, password, aadharNo });

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWTSECRETKEY
      );
      res.status(200).json({ user: existingUser, token: token });
    } else {
      res.status(400).json("add correct credentials");
    }
  } catch (error) {
    console.log("login error");
    res.status(500).json(error);
  }
};

//get notification

exports.getNotification = async (req, res) => {
  try {
    const userId = req.userId;

    const ExistingUser = await users.findOne({ _id: userId });
    if (ExistingUser) {
      res.status(200).json(ExistingUser.Notification);
    }
    console.log(ExistingUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("server error");
  }
};

//clear notification
exports.ClearNotification = async (req, res) => {
  const UserId = req.userId;
  try {
    await users.findOneAndUpdate(
      { _id: UserId },
      { $set: { Notification: [] } }
    );
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ message: "serror error" });
    console.log(error);
  }
};

//onacceptingLOcal serviceRequest
exports.onAcceptingLocalServiceReq = async (req, res) => {};
