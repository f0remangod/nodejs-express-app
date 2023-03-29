const {
  joiToggleFavouriteContactSchema,
} = require("../../validation/contacts");
const Contact = require("../../models/contacts/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = joiToggleFavouriteContactSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing field favorite",
      });
      return;
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
