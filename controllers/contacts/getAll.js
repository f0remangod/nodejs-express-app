const Contact = require("../../models/contacts/contact");

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const { page = 1, limit = 10, favorite = false } = req.query;
    const skip = (page - 1) * limit;

    let contacts;

    if (favorite) {
      contacts = await Contact.find({ owner: _id, favorite: true }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id, email");
    } else {
      contacts = await Contact.find({ owner: _id }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id, email");
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
