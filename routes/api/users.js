const express = require("express");

const { tokenCheck } = require("../../middlewares");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.get("/current", tokenCheck, ctrl.getCurrentUser);
router.post("/logout", tokenCheck, ctrl.logout);

/*
update subscription "starter", "pro", "business"
*/
router.patch("/", tokenCheck, ctrl.updateSubscription);

module.exports = router;
