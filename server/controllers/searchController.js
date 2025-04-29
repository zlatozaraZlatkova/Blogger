const router = require("express").Router();

const { getSearchItem } = require("../services/searchService");
const { errorParser } = require("../utils/errorParser");

// @route   Get /api/search?search=second
router.get("/", async (req, res) => {
  try {
    const task = await getSearchItem(req.query.search);
    if(task.length === 0) {
      return res.status(404).json({ message: "No documents matched your search" });
    }

    res.json(task);

  } catch (error) {
    const message = errorParser(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
