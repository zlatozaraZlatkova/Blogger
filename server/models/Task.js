const { Schema, model, Types } = require("mongoose");

const taskSchema = new Schema({
    sectionId: {
        type: Types.ObjectId,
        required: true,
        ref: "Section",
    },
    title: {
        type: String,
        required: true,
        minLength: [2, "Title should be at least 2 characters long"],
        maxLength: [20, "title shouldn't contain more than 20 characters "],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, "Description should be at least 5 characters long"],
        maxLength: [250, "Description shouldn't contain more than 250 characters "]

    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["to do", "in progress", "in review", "qa", "done"],
            message: "Invalid status",
            default: "to do",
        },

    },
    ownerId: {
        type: Types.ObjectId,
        required: true,
        ref: "User",
    },
    // date: { type: Date, default: Date.now },

}, { timestamps: true })

taskSchema.index(
    { title: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Task = model("Task", taskSchema);

module.exports = Task;