const User = require("../models/User");
const OverallStats = require("../models/OverallStats");
const Transaction = require("../models/Transaction");

//@desc get user info
//@route GET /general/user/:id
//@access Private
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//@desc get dashboard info
//@route GET /general/dashboard/
//@access Private
const getDashboardStats = async (req, res) => {
  try {
    //mock data
    const currentMonth = "November";
    const currentYear = "2021";
    const currentDay = "2021-11-15";

    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const overallStats = await OverallStats.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      dailyData,
    } = overallStats[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const thisDayStats = dailyData.find(({ date: day }) => {
      return day === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      thisDayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { getUser, getDashboardStats };
