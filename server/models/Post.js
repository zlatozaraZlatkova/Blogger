const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    postTitle: {
        type: String,
        required: true,
        minLength: [5, "Title should be at least 5 characters long"],
        maxLength: [150, "Title shouldn't contain more than 150 characters "],
    },
    postText: {
        type: String,
        required: true,
        minLength: [5, "Post should be at least 5 characters long"],
        maxLength: [3000, "Post shouldn't contain more than 3000 characters "],
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
                minLength: [5, "Comment should be at least 5 characters long"],
                maxLength: [250, "Comment shouldn't contain more than 250 characters"],
            },
            name: {
                type: String
            },
            avatar: {
                type: String
            },
            user: {
                type: Types.ObjectId,
                required: true,
                ref: "User",
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    // date: {
    //     type: Date,
    //     default: Date.now,
    // }

}, { timestamps: true })


const Post = model("Post", postSchema);
module.exports = Post;