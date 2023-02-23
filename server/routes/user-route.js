const express = require("express");
const authController = require("./../controllers/auth-controller");
const userController = require("./../controllers/user-controller");
const walletRouter = require("./../routes/wallet-route");
const dashboardRouter = require("./../routes/dashboard-route");
const depositRouter = require("./../routes/deposit-route");
const withdrawRouter = require("../routes/withdraw-route");

const router = express.Router();

router.use("/:userId/wallet", walletRouter);
router.use("/:id/dashboard", dashboardRouter);
router.use("/:id/deposit", depositRouter);
router.use("/:id/withdraw", withdrawRouter);

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authController.forgotPassword);
router.patch("/reset-password/:token", authController.resetPassword);
router.post(
  "/send-verify-request",
  authController.protect,
  authController.sendVerifyRequest
);
router.post("/upload", authController.protect, userController.uploadImage);

router.patch(
  "/updatePassword/:id",
  authController.protect,
  authController.updatePassword
);
router.patch(
  "/updateUser/:id",
  authController.protect,
  userController.updateUser
);
router.get(
  "/:id",
  authController.protect,
  authController.setUserId,
  userController.getUser
);

module.exports = router;
