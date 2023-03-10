const express = require("express");

const contactsOperations = require("../../models/contacts");

const router = express.Router();

const Joi = require("joi");

/**
 * Fields validation schema
 */

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .min(0)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
});

/**
 * Get all contacts
 */

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Get contact by id
 */

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Create contact
 */

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * Delete contact by id
 */

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsOperations.removeContact(contactId);

  if (!result) {
    res.json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({ message: "contact deleted" });
});

/**
 * Edit contact by id
 */

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.json({
        status: "error",
        code: 400,
        message: "Bad request",
      });
      return;
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
