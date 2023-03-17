const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

/**
 * Get all contacts
 */

router.get("/", ctrl.getAll);

/**
 * Get contact by id
 */

router.get("/:contactId", ctrl.getById);

/**
 * Create contact
 */

router.post("/", ctrl.createNew);

/**
 * Delete contact by id
 */

router.delete("/:contactId", ctrl.deleteById);

/**
 * Edit contact by id
 */

router.put("/:contactId", ctrl.editById);

module.exports = router;
