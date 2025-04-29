const { Schema, model, Types } = require("mongoose");

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Name should be at least 2 characters long"],
        maxLength: [30, "Name shouldn't contain more than 30 characters "],
    },
    membersList: {
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
    // date: { type: Date, default: Date.now }
}, { timestamps: true });


const Team = model("Team", teamSchema);

module.exports = Team;
