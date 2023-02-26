const express = require("express");
const authController = require("../controllers/auth-controller");
const withdrawController = require("../controllers/withdraw-controller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authController.protect,
    withdrawController.setUserId,
    withdrawController.createWithdraw
  )
  .get(authController.protect, withdrawController.getAllWithdraw);

router
  .route("/:id")
  .get(authController.protect, withdrawController.getWithdraw)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "guide"),
    withdrawController.updateWithdraw
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    withdrawController.deleteWithdraw
  );

module.exports = router;
