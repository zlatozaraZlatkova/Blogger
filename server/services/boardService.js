const Board = require("../models/Board");
const User = require("../models/User");
const Section = require("../models/Section")


async function getAll() {
  return Board.find({}).sort({ date: -1 }).populate("ownerId", ["name", "avatar"]);
}

async function getById(id) {
  return Board.findById(id);
}

async function createItem(userId, boardData, sectionsData) {
  try {
    const newBoard = await Board.create(boardData);
  
    await User.findByIdAndUpdate(
      userId,
      { $push: { createdBoards: newBoard._id } }
    );
    
    if (!sectionsData || sectionsData.length === 0) {
      return { board: newBoard };
    }

    const sections = sectionsData.map(section => ({
      title: section.title,
      boardId: newBoard._id,
      ownerId: userId,
      tasksList: [],
      usersList: []
    }));

    const createdSections = await Section.create(sections);
    const sectionIds = createdSections.map(section => section._id);

    await User.findByIdAndUpdate(
      userId,
      { $push: { createdSections: { $each: sectionIds } } }
    );


    await Board.findByIdAndUpdate(
      newBoard._id,
      { $push: { sectionsList: { $each: sectionIds } } }
    );

    console.log("Board updated with sections");

    return {
      board: newBoard,
      sections: createdSections
    };

  } catch (error) {
    console.error("Error in createItem:", error);
    throw error;
  }
}

async function updateItem(itemId, data) {
  const existing = await Board.findById(itemId);
  existing.title = data.title;

  return existing.save();
}

async function deleteById(boardId, userId) {
  await User.findByIdAndUpdate(userId, { $pull: { createdBoards: boardId } }, { new: true });

  await Board.findByIdAndDelete(boardId);

};


module.exports = {
  getAll,
  getById,
  createItem,
  updateItem,
  deleteById

};
