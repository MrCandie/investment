const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

const transactionId = new ShortUniqueId({ length: 20 });

const depositSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "deposit must have an amount"],
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
    address: {
      type: String,
      required: [true, "transaction must have an address"],
      trim: true,
    },
    plan: {
      type: String,
      required: [true, "transaction must contain an plan"],
      trim: true,
    },
    type: {
      type: String,
      default: "deposit",
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Deposit", depositSchema);
