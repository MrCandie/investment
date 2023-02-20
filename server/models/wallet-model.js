const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    bitcoin: {
      type: String,
    },
    ethereum: {
      type: String,
    },
    litecoin: {
      type: String,
    },
    usdt: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "wallet must belong to a user"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
