const Post = require("../models/Post");

const { errorParser } = require("../utils/errorParser");

const modelsMap = {
  "Post": Post,
};

const loadItem = (modelName) => async (req, res, next) => {
  try {
    const Model = modelsMap[modelName];

    const item = await Model.findById(req.params.id);
   

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    req.item = item;

    next();
    
  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
};

module.exports = {
  loadItem,
};
