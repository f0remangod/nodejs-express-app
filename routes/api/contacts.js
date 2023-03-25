const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId, tokenCheck } = require("../../middlewares");

/**
 * Get all contacts
 */

router.get("/", tokenCheck, ctrl.getAll);

/**
 * Get contact by id
 */

router.get("/:contactId", tokenCheck, isValidId, ctrl.getById);

/**
 * Create contact
 */

router.post("/", tokenCheck, ctrl.createNew);

/**
 * Delete contact by id
 */

router.delete("/:contactId", tokenCheck, isValidId, ctrl.deleteById);

/**
 * Edit contact by id
 */

router.put("/:contactId", tokenCheck, isValidId, ctrl.editById);

/**
 * Toggle fevourite or not for contact by id
 */

router.patch(
  "/:contactId/favorite",
  tokenCheck,
  isValidId,
  ctrl.updateStatusContact
);

module.exports = router;
