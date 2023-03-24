const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { isValidId } = require("../../middlewares");

/**
 * Get all contacts
 */

router.get("/", ctrl.getAll);

/**
 * Get contact by id
 */

router.get("/:contactId", isValidId, ctrl.getById);

/**
 * Create contact
 */

router.post("/", ctrl.createNew);

/**
 * Delete contact by id
 */

router.delete("/:contactId", isValidId, ctrl.deleteById);

/**
 * Edit contact by id
 */

router.put("/:contactId", isValidId, ctrl.editById);

/**
 * Toggle fevourite or not for contact by id
 */

router.patch("/:contactId/favorite", isValidId, ctrl.updateStatusContact);

module.exports = router;
