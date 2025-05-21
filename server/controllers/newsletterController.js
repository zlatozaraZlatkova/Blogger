const router = require("express").Router();
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validateBodyRequest");
const { signup, unsubscribed, getExistingEmail } = require("../services/newsletterService");

router.post("/signup",
    body("email", "Email is required").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    validateRequest,
    async (req, res, next) => {
        try {
            const inputEmail = req.body.email;

            const existingEmail = await getExistingEmail(inputEmail);

            if (existingEmail) {
                return res.status(409).json({ message: "You are already signed up for our news." });
            }

            const signUpForNewsletter = await signup(inputEmail);

            res.status(200).json({ message: "You signed up to receive the newsletter, which is sent out on a regular basis." });
        } catch (error) {
            next(error);
        }
    }
);

router.post("/unsubscribe",
    body("email", "Email is required").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    validateRequest,
    async (req, res, next) => {
        try {
            const inputEmail = req.body.email;

            const existingEmail = await getExistingEmail(inputEmail);

            if (!existingEmail) {
                return res.status(404).json({ message: "First you should subscribe for our news." });
            }

            const unsubscribedForNewsletter = await unsubscribed(inputEmail);

            res.status(200).json({ message: "The newsletter is no longer being received by you as you have unsubscribed." });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;