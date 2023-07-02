const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).send(admins);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const getUserPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    const userStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);
    delete userStats[0].password

    const salesTransactions = await Promise.all(
      userStats[0].affiliateStats.affiliateSales.map((id) =>
        Transaction.findById(id)
      )
    );

    const filteredsalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );
    res
      .status(200)
      .json({ user: userStats[0], sales: filteredsalesTransactions });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

module.exports = { getAdmins, getUserPerformance };
