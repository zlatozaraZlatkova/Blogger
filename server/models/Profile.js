const { Schema, model, Types } = require("mongoose");

const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

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
        type: String,
        validate: {
          validator: (value) => {
            if (!value) return true; 
            return URL_REGEX.test(value);
          },
          message: (props) => `${props.value} is not a valid URL`, 
        },
      },
      linkedin: {
        type: String,
        validate: {
          validator: (value) => {
            if (!value) return true; 
            return URL_REGEX.test(value);
          },
          message: (props) => `${props.value} is not a valid URL`, 
        },
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