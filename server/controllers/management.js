const mongoose = require("mongoose");
const User = require("../models/User");

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).send(admins);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { getAdmins };
