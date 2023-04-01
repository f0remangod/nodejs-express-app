const register = require("./register");
const login = require("./login");
const getCurrentUser = require("./current");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendEmail,
};
