const router = require("express").Router();
const { body } = require("express-validator");

const { register, login, logout} = require("../services/authService");
const { hasUser } = require("../middlewares/guards");
const validateRequest = require("../middlewares/validateBodyRequest");

router.post("/register",
  body("name", "Name is required").not().isEmpty(),
  body("name", "Please enter a name with 2 or more character").isLength({ min: 2}),
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password","Please enter a password with 8 or more characters").isLength({ min: 8 }),
  validateRequest,
  async (req, res, next) => {
    try {
      const { _id, email, accessToken } = await register(
        req.body.name,
        req.body.email,
        req.body.password,
    
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      });

      res.status(200).json({ _id, email });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login",
  body("email", "Email is required").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body("password", "Password is required").not().isEmpty(),
  validateRequest,
  async (req, res, next) => {
    try {
      const { _id, email, accessToken } = await login(
        req.body.email,
        req.body.password
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hour in ms
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
      });

      res.status(200).json({ _id, email});
    } catch (error) {
      next(error);
    }
  }
);

router.get("/logout", hasUser(), async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    await logout(token);

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});



module.exports = router;