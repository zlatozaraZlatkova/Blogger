const Task = require("../models/Task");

async function getSearchItem(search) {
  const query = {};

  if (search) {
    query.title = new RegExp(search, "i");
  }

  return Task.find(query);
}

module.exports = {
  getSearchItem,
};
