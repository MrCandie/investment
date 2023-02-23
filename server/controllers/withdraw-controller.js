const Withdraw = require("./../models/withdraw-model");

const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.setUserId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.createWithdraw = catchAsync(async (req, res, next) => {
  if (!req.user.emailIsVerified) {
    return next(
      new AppError("Verify your email address to complete this action")
    );
  }
  const newWithdraw = await Withdraw.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      withdraw: newWithdraw,
    },
  });
});

exports.getAllWithdraw = catchAsync(async (req, res, next) => {
  const withdraws = await Withdraw.find().populate("user");

  res.status(200).json({
    status: "success",
    data: {
      withdraws,
    },
  });
});

exports.updateWithdraw = catchAsync(async (req, res, next) => {
  const withdraw = await Withdraw.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      withdraw,
    },
  });
});

exports.deleteWithdraw = catchAsync(async (req, res, next) => {
  const withdraw = await Withdraw.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
