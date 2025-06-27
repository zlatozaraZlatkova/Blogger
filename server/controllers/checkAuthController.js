const router = require("express").Router();

const { getAuthUser } = require("../services/checkAuthService");

router.get("/", async (req, res, next) => {

  try {
    const user = await getAuthUser(req.user._id);
    console.log(req.user._id);
   
    if (!user) {
      return res.status(404).json({ isAuthenticated: false });
    }

    res.json({ isAuthenticated: true });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
