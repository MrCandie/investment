const Wallet = require("./../models/wallet-model");

const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");
const { findById } = require("../models/user-model");

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.params.id) req.params.id = req.user.id;
  next();
};

exports.createWallet = catchAsync(async (req, res, next) => {
  const newWallet = await Wallet.create(req.body);
  return res.status(201).json({
    status: "success",
    data: {
      wallet: newWallet,
    },
  });
});

exports.getWallet = catchAsync(async (req, res, next) => {
  const wallet = await findById(req.params.id);
  if (!wallet) {
    return next(new AppError("wallet not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      wallet: wallet,
    },
  });
});

exports.getAllWallet = catchAsync(async (req, res, next) => {
  const wallets = await Wallet.find().populate("user");

  return res.status(200).json({
    status: "success",
    data: {
      wallets,
    },
  });
});

exports.updateWallet = catchAsync(async (req, res, next) => {
  const body = {
    bitcoin: req.body.bitcoin,
    ethereum: req.body.ethereum,
    litecoin: req.body.litecoin,
    usdt: req.body.usdt,
  };
  const wallet = await Wallet.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!wallet) {
    return next(new AppError("wallet not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      wallet,
    },
  });
});
