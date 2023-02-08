const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sendEmail = require("../utilities/Email");
const sendEmailFP = require("../utilities/EmailFP");

const SALT_ROUNDS = 10;

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    }).select("-__v");
    console.log("user", user);

    if (!user) {
      throw new Error("Wrong password or email");
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordMatch) {
      const newUser = user.toObject();

      delete newUser.password;

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res.cookie("lhr", token);
      res.status(201).json({
        status: "success",
        newUser,
      });
    }
  } catch (error) {
    res.send({
      status: "fail",
      message: error.message,
    });
  }
};

exports.register = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ register", req.body);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🦩 ~ exports.register= ~ hashedPass", hashedPass);

    console.log("🦩 ~ exports.register= ~ salt", salt);

    req.body.password = hashedPass;

    const createUser = await User.create(req.body);

    const token = jwt.sign(
      {
        id: createUser._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    sendEmail(token);

    res.status(201).json({
      status: "success",
      createUser,
    });
  } catch (error) {
    console.log("🦩 ~ Error from ~ register", error.message);

    res.send({ status: "fail", error: error.message });
  }
};

exports.emailConfirm = async (req, res) => {
  try {
    console.log("🦩 ~ hello emailConfirm ", req.body);

    const token = req.body.token;

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log("🦩 ~ emailConfirm ~ decoded", decoded);

    const user = await User.findByIdAndUpdate(
      { _id: decoded.id },
      { verified: true },
      { new: true }
    );
    console.log("🦩 ~ emailConfirm ~ user", user);

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log("🦩 ~ emailConfirm ~ error", error.message);

    res.send({ status: "fail", error: error.message });
  }
};

exports.forgotPass = async (req, res) => {
  try {
    console.log("🦩 ~ hello forgotPass ", req.body);

    const user = await User.findOne({
      email: req.body.email,
    });
    console.log("🦩 ~ exports.forgotPass= ~ user", user);

    sendEmailFP("Hello", "forgotpass");

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log("🦩 ~ forgotPass ~ error", error.message);

    res.send({ status: "fail", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ getAllUsers");

    const allUsers = await User.find();

    res.status(200).json({
      status: "Success",
      data: allUsers,
    });
  } catch (error) {
    console.log("🦩 ~ Error from ~ getAllUsers", error.message);

    res.send({ success: false, error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ updateUser", req.params.id);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "Success",
      data: updatedUser,
    });
  } catch (error) {
    console.log("🦩 ~ Error from ~ updateUser", error.message);

    res.send({ success: false, error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ deleteUser", req.params.id);

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(202).json({
      status: "Success",
      data: deletedUser,
    });
  } catch (error) {
    console.log("🦩 ~ Error from ~ deleteUser", error.message);

    res.send({ success: false, error: error.message });
  }
};
