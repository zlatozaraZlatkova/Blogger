const router = require("express").Router();

const { getAuthUser } = require("../services/checkAuthService");

router.get("/", async (req, res, next) => {

  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        isAuthenticated: false,
        message: 'No active session'
      });
    }


    const user = await getAuthUser(req.user._id);
    //console.log(req.user._id);
   
    if (!user) {
      return res.status(404).json({ isAuthenticated: false });
    }

    res.json(user);

  } catch (error) {
    //console.log(error);
    next(error);
  }
});

module.exports = router;
