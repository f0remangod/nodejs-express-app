const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId, authTokenCheck } = require("../../middlewares");

/**
 * Get all contacts
 */

router.get("/", authTokenCheck, ctrl.getAll);

/**
 * Get contact by id
 */

router.get("/:contactId", authTokenCheck, isValidId, ctrl.getById);

/**
 * Create contact
 */

router.post("/", authTokenCheck, ctrl.createNew);

/**
 * Delete contact by id
 */

router.delete("/:contactId", authTokenCheck, isValidId, ctrl.deleteById);

/**
 * Edit contact by id
 */

router.put("/:contactId", authTokenCheck, isValidId, ctrl.editById);

/**
 * Toggle fevourite or not for contact by id
 */

router.patch(
  "/:contactId/favorite",
  authTokenCheck,
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
