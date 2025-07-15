const User = require("../models/User");

async function getAuthUser(id) {
  return User.findById(id)
    .select("-hashedPassword")
    .populate("createdPosts")
    .populate("likedPostList", "name avatar postTitle postImageUrl");
}

module.exports = {
  getAuthUser,
};
