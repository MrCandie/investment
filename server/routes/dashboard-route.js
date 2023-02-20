const express = require("express");
const authController = require("./../controllers/auth-controller");
const dashboardController = require("./../controllers/dashboard-controller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(dashboardController.setUserId, dashboardController.createDashboard)
  .get(authController.protect, dashboardController.getAllDashboards);

module.exports = router;
