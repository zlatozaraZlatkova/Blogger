const { Schema, model, Types } = require("mongoose");

const boardSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Title should be at least 2 characters long"],
        maxLength: [20, "Title shouldn't contain more than 20 characters "],
    },
    sectionsList: {
        type: [Types.ObjectId],
        required: true,
        ref: "Sections",
        default: [],
    },
    ownerId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    // date: { type: Date, default: Date.now }

}, { timestamps: true })

boardSchema.index(
    { title: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
)

const Board = model("Board", boardSchema);

module.exports = Board;