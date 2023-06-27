const OverallStats = require("../models/OverallStats");

//@desc get overview of sales
//@route GET /sales/overview/
//@access Private
const getSales = async (req, res) => {
  try {
    const overallStats = await OverallStats.find();
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getSales };
