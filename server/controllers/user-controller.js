const User = require("./../models/user-model");
const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const body = {
    name: req.body.name,
  };
  const user = await User.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
