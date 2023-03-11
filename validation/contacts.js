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

module.exports = contactSchema;
