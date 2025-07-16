const { Schema, model, Types } = require("mongoose");


const profileSchema = new Schema(
  {
    bio: {
      type: String,
      required: true, 
      minLength: [5, "Bio should be at least 5 characters long"],
      maxLength: [300, "Bio shouldn't contain more than 300 characters"],
    },
    githubUsername: {
      type: String,
    },
    socialMedia: {
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Profile = model("Profile", profileSchema);

module.exports = Profile;