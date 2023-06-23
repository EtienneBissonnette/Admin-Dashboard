const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    userId: { type: String },
    cost: { type: String },
    products: { type: [mongoose.Types.ObjectId], of: Number },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
