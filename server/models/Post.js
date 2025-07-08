const { Schema, model, Types } = require("mongoose");
const URL_REGEX =
  /^((https|http):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/gim;

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    avatar: {
      type: String,
    },
    postTitle: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [5, "Title should be at least 5 characters long"],
      maxLength: [150, "Title shouldn't contain more than 150 characters "],
    },
    postImageUrl: {
      type: String,
      required: true,
      validator: (value) => URL_REGEX.test(value),
      message: (props) => {
        console.log(props);
        return `${props.value} is not a valid image URL`;
      },
    },
    postCategory: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["technologies", "languages", "tools", "topics"],
    },
    postText: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [5, "Post should be at least 5 characters long"],
      maxLength: [3000, "Post shouldn't contain more than 3000 characters "],
    },
    postTags: {
      type: [String],
      required: true,
      lowercase: true,
    },
    ownerId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    postLikes: {
      type: [Types.ObjectId],
      required: true,
      ref: "User",
      default: [],
    },
    comments: [
      {
        text: {
          type: String,
          required: true,
          lowercase: true,
          minLength: [5, "Comment should be at least 5 characters long"],
          maxLength: [
            250,
            "Comment shouldn't contain more than 250 characters",
          ],
        },
        name: {
          type: String,
          lowercase: true,
        },
        avatar: {
          type: String,
        },
        user: {
          type: Types.ObjectId,
          required: true,
          ref: "User",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
module.exports = Post;
