const mongoose = require("mongoose");

const affiliateStatsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" },
  },
  { timestamps: true }
);

const AffiliateStats = mongoose.model("AffiliateStats",affiliateStatsSchema);

module.exports = AffiliateStats;
