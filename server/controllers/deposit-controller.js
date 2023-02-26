const Deposit = require("./../models/deposit-model");

const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.setUserId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.createDeposit = catchAsync(async (req, res, next) => {
  const newDeposit = await Deposit.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      deposit: newDeposit,
    },
  });
});

exports.getAllDeposits = catchAsync(async (req, res, next) => {
  const deposits = await Deposit.find().populate("user");

  res.status(200).json({
    status: "success",
    data: {
      deposits,
    },
  });
});

exports.updateDeposit = catchAsync(async (req, res, next) => {
  const deposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!deposit) {
    return next(new AppError("deposit transaction not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      deposit,
    },
  });
});

exports.getDeposit = catchAsync(async (req, res, next) => {
  const deposit = await Deposit.findById(req.params.id);
  if (!deposit) {
    return next(new AppError("deposit transaction not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      deposit,
    },
  });
});

exports.deleteDeposit = catchAsync(async (req, res, next) => {
  const deposit = await Deposit.findByIdAndDelete(req.params.id);
  if (!deposit) {
    return next(new AppError("deposit transaction not found", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
