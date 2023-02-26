const express = require("express");

const depositController = require("./../controllers/deposit-controller");
const authController = require("./../controllers/auth-controller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authController.protect, depositController.getAllDeposits)
  .post(
    authController.protect,
    depositController.setUserId,
    depositController.createDeposit
  );

router
  .route("/:id")
  .get(authController.protect, depositController.getDeposit)
  .patch(
    authController.protect,
    authController.restrictTo("guide", "admin"),
    depositController.updateDeposit
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    depositController.deleteDeposit
  );

module.exports = router;
