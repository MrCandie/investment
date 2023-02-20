const Dashboard = require("./../models/dashboard-model");

const catchAsync = require("./../utils/catch-async");
const AppError = require("./../utils/app-error");

exports.setUserId = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.params.id;
  next();
});

exports.createDashboard = catchAsync(async (req, res, next) => {
  const newDashboard = await Dashboard.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      dashboard: newDashboard,
    },
  });
});

exports.getAllDashboards = catchAsync(async (req, res, next) => {
  const dashboards = await Dashboard.find().populate("user");

  res.status(200).json({
    status: "success",
    data: {
      dashboards,
    },
  });
});
