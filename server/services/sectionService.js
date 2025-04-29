const Section = require("../models/Section");
const Board = require("../models/Board");
const User = require("../models/User");

async function getById(id) {
    return Section.findById(id);
}


async function createItem(userId, boardId, data) {
    const newItem = await Section.create(data);

    await User.findByIdAndUpdate(userId, { $push: { createdSections: newItem._id } }, { new: true });
    await Board.findByIdAndUpdate(boardId, { $push: { sectionsList: newItem._id } }, { new: true });

    return newItem;
}


async function updateItem(itemId, data) {
    const existing = await Section.findById(itemId);
    existing.title = data.title;

    return existing.save();
}


async function deleteById(sectionId, boardId, userId) {
    await User.findByIdAndUpdate(userId, { $pull: { createdSections: sectionId } }, { new: true });
    await Board.findByIdAndUpdate(boardId, { $pull: { sectionsList: sectionId } }, { new: true });
   
    await Section.findByIdAndDelete(sectionId);

};


module.exports = {
    getById,
    createItem,
    updateItem,
    deleteById
};
