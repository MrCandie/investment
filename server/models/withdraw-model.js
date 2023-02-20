const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const transactionId = new ShortUniqueId({ length: 20 });

const withdrawSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "withdraw must have an amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "transaction must belong to a user"],
    },
  ],
  asset: {
    type: String,
    required: [true, "transaction must contain an asset"],
    trim: true,
  },
  plan: {
    type: String,
    required: [true, "transaction must contain an plan"],
    trim: true,
  },
  type: {
    type: String,
    default: "withdraw",
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed", "nil"],
    default: "nil",
    trim: true,
  },
  transactionID: {
    type: String,
    default: transactionId(),
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
