const mongoose = require("mongoose");

const overallStatsSchema = mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ day: String, totalSales: Number, totalUnits: Number }],
    salesByCategory: { type: Map, of: Number },
  },
  { timestamp: true }
);

const OverallStats = mongoose.model("OverallStats", overallStatsSchema);

module.exports = OverallStats;
