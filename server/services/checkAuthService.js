const User = require("../models/User");

async function getAuthUser(id) {
  return User.findById(id).select("-hashedPassword");
}

module.exports = {
  getAuthUser,
};
