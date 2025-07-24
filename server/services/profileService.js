const Profile = require("../models/Profile");
const User = require("../models/User");


async function getProfileById(id) {
  const profile = await Profile.findById(id);
  if (!profile) {
    throw new Error('Profile not found');
  }

  const user = await User.findById(profile.ownerId)
    .select('createdPosts')
    .populate('createdPosts')

  return {
    profile: profile,
    createdPosts: user.createdPosts
  };
}

async function getUserById(id) {
  return Profile.findOne({ ownerId: id }).populate("ownerId", [
    "likedPostList"
  ])
}

async function createItem(userId, profileData) {
  const newProfile = await Profile.create(profileData);

  await User.findByIdAndUpdate(
    userId,
    { publicProfile: newProfile._id },
    { new: true }
  );

  return newProfile;

}

async function updateItem(userId, profileData) {
  return Profile.findOneAndUpdate(
    { ownerId: userId },
    { $set: profileData, $currentDate: { updatedAt: true } },
    { new: true }
  );
}

async function deleteById(userId) {
  await User.findByIdAndUpdate(
    userId,
    { $unset: { publicProfile: 1 } },
    { new: true }

  )
  await Profile.findOneAndDelete({ ownerId: userId });
}




module.exports = {
  getProfileById,
  getUserById,
  createItem,
  updateItem,
  deleteById

};