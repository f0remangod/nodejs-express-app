const express = require("express");

const { authTokenCheck, upload } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/current", authTokenCheck, ctrl.getCurrentUser);
router.post("/logout", authTokenCheck, ctrl.logout);
router.patch(
  "/avatars",
  authTokenCheck,
  upload.single("avatar"),
  ctrl.updateAvatar
);

/*
update subscription "starter", "pro", "business"
*/
router.patch("/", authTokenCheck, ctrl.updateSubscription);

/*
email verification
*/
router.get("/verify/:verificationToken", authTokenCheck, ctrl.verifyEmail);

/*
resend verification email
*/

router.post("/verify", authTokenCheck, ctrl.resendEmail);

module.exports = router;
