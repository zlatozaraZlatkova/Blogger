const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Name should be at least 2 characters long"],
        maxLength: [30, "Name shouldn't contain more than 30 characters "],
        match: [
            /^[a-zA-Z0-9\s]+$/gi,
            "Username may contain only english letters and numbers",
        ],
    },
    email: {
        type: String,
        required: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
            "Email is invalid",
        ],
    },
    hashedPassword: { type: String, required: true },
    avatar: { type: String },
    createdBoards: {
        type: [Types.ObjectId],
        required: true,
        ref: "Board",
        default: [],
    },
    createdSections: {
        type: [Types.ObjectId],
        required: true,
        ref: "Sections",
        default: [],
    },
    createdTasks: {
        type: [Types.ObjectId],
        required: true,
        ref: "Task",
        default: [],
    },
    createdPosts: {
        type: [Types.ObjectId],
        required: true,
        ref: "Post",
        default: [],
    },
    likedPostList: {
        type: [Types.ObjectId],
        required: true,
        ref: "Post",
        default: [],
    },
    teams: {
        type: [Types.ObjectId],
        required: true,
        ref: "Team",
        default: [],
    },
    sentInvitations: [
        {
            email: {
                type: String,
                required: true,
                minLength: [2, "Name should be at least 2 characters long"],
                maxLength: [30, "Name shouldn't contain more than 30 characters "],
                match: [
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                    "Email is invalid",
                ],
            },
            userId: {
                type: Types.ObjectId,
                required: true,
                ref: "User",
            },
            date: {
                type: Date,
                default: Date.now
            }

        },
    ],
    receivedInvitations: {
        type: [Types.ObjectId],
        required: true,
        ref: "User",
        default: [],
    },
    // date: { type: Date, default: Date.now },
}, { timestamps: true });

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const User = model("User", userSchema);

module.exports = User;
