const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

exports.login = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ login", req.body);

    const user = await User.findOne({
      email: req.body.email,
    }).select("-__v");
    console.log("user", user);

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log("🦩 ~ exports.login= ~ passwordMatch", passwordMatch);

    if (passwordMatch) {
      const newUser = user.toObject();

      delete newUser.password;

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res.cookie("lhr", token);
      res.status(201).json({
        status: "Success",
        newUser,
      });
    }
  } catch (error) {
    console.log("🦩 ~ Error from ~ login", error.message);

    res.send({ success: false, error: error.message });
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

    res.status(201).json({
      status: "Success",
      createUser,
    });
  } catch (error) {
    console.log("🦩 ~ Error from ~ register", error.message);

    res.send({ success: false, error: error.message });
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
