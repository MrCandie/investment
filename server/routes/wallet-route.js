const express = require("express");

const walletController = require("./../controllers/wallet-controller");
const authController = require("./../controllers/auth-controller");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authController.protect,
    walletController.setUserId,
    walletController.createWallet
  )
  .get(authController.protect, walletController.getAllWallet);

router.route("/:id").patch(walletController.updateWallet);
module.exports = router;
