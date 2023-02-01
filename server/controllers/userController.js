const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    console.log("🦩 ~ Hello from ~ register", req.body);

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
