const Task = require("../models/Task");
const User = require("../models/User");
const Section = require("../models/Section");


async function getAll() {
    return Task.find({})
}

async function getById(id) {
    return Task.findById(id)
}


async function createItem(userId, sectionId, data) {
    const newItem = await Task.create(data);
    await User.findByIdAndUpdate(userId, { $push: { createdTasks: newItem._id } }, { new: true });
    await Section.findByIdAndUpdate(sectionId, { $push: { tasksList: newItem._id } }, { new: true });
    return newItem;
}

async function updateItem(itemId, data) {
    const existing = await Task.findById(itemId);
    existing.title = data.title;
    existing.description = data.description;
    existing.status = data.status;
  
    return existing.save();
}

async function deleteById(taskId, sectionId, userId) {
    await User.findByIdAndUpdate(userId, { $pull: { createdTasks: taskId } }, { new: true });
    await Section.findByIdAndUpdate(sectionId, { $pull: { tasksList: taskId } }, { new: true });
    await Task.findByIdAndDelete(taskId);
  
};



  

module.exports = {
    getAll,
    getById,
    createItem,
    updateItem,
    deleteById,
}