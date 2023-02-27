const mongoose = require("mongoose");
const validator = require("validator");

const walletSchema = new mongoose.Schema(
  {
    bitcoin: {
      type: String,
      validate: [
        validator.isBtcAddress,
        "please enter a valid bitcoin address",
      ],
    },
    ethereum: {
      type: String,
      validate: [
        validator.isEthereumAddress,
        "please enter a valid ethereum address",
      ],
    },
    litecoin: {
      type: String,
    },
    usdt: {
      type: String,
      validate: [
        validator.isEthereumAddress,
        "please enter a valid USDT address",
      ],
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
