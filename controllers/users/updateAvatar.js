const User = require("../../models/users/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const { _id } = req.user;

  const newImageName = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, newImageName);

    await fs.rename(tempUpload, resultUpload);

    const avatarUrl = path.join("public", "avatars", newImageName);

    Jimp.read(avatarUrl)
      .then((image) => {
        image.resize(Jimp.AUTO, 250).quality(70).write(resultUpload);
      })
      .catch((err) => {
        throw err;
      });

    await User.findByIdAndUpdate(req.user._id, { avatarUrl });

    res.json({ avatarUrl });
  } catch (error) {
    await fs.unlink(tempUpload);

    throw error;
  }
};

module.exports = updateAvatar;
