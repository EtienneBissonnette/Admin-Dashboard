const mongoose = require("mongoose");

const productStatSchema = mongoose.Schema(
  {
    productId: { type: String, required: true },
    yearlySalesTotal: { type: Number },
    yearlyTotalSoldUnits: { type: Number },
    year: { type: Number },
    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: [{ day: String, totalSales: Number, totalUnits: Number }],
  },
  { timestamp: true }
);

const ProductStats = mongoose.model("ProductStats", productStatSchema);

module.exports = ProductStats;
