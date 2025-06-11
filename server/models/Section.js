const { Schema, model, Types } = require("mongoose");

const sectionSchema = new Schema({
    boardId: {
        type: Types.ObjectId,
        required: true,
        ref: "Board"
    },
    title: {
        type: String,
        required: true,
        minLength: [2, "Title should be at least 2 characters long"],
        maxLength: [20, "Title shouldn't contain more than 20 characters "],
    },
    tasksList: {
        type: [Types.ObjectId],
        required: true,
        ref: "Task",
        default: [],
    },
    usersList: {
        type: [Types.ObjectId],
        required: true,
        ref: "User",
        default: [],
    },
    ownerId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },

}, { timestamps: true })

sectionSchema.index(
    { title: 1, boardId: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Section = model("Section", sectionSchema);

module.exports = Section;