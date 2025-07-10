const router = require("express").Router();
const { body } = require("express-validator");

const validateRequest = require("../middlewares/validateBodyRequest");
const { hasUser } = require("../middlewares/guards");
const { getUserById, createItem, updateItem, deleteById } = require("../services/profileService");


router.get("/", hasUser(),
    async (req, res, next) => {
        try {
            const profile = await getUserById(req.user._id);
            console.log("public profile", profile)

            if (!profile) {
                throw new Error("There is no profile for this user.");
            }

            res.status(200).json(profile);

        } catch (error) {
            next(error);
        }
    });

router.get("/:id", hasUser(),
    async (req, res, next) => {

        try {
            const userProfile = req.user._id;

            const existingUser = await getUserById(userProfile);

            if (!existingUser) {
                throw new Error("User not found.");
            }

            res.status(200).json(existingUser);

        } catch (error) {
            next(error);

        }
    })


router.post("/create", hasUser(),
    body("bio", "Short bio is required").notEmpty(),
    body("bio", "Short description up to 3000 characters long").isLength({ max: 3000 }),
    validateRequest,
    async (req, res, next) => {

        try {
            const userId = req.user._id;
            const { bio, githubUsername, linkedin } = req.body;

            let publicProfile = await getUserById(userId);


            if (publicProfile) {
                throw new Error("Profile already exists.");
            }


            const profileInputFields = {
                bio,
                githubUsername,
                socialMedia: {
                    linkedin
                },
                ownerId: userId
            };

            if (linkedin) {
                profileInputFields.socialMedia = { linkedin };
            }

            const profile = await createItem(userId, profileInputFields);

            res.status(201).json(profile);

        } catch (error) {
            next(error);

        }

    })

router.post("/update", hasUser(),
    body("bio", "Short bio is required").notEmpty(),
    body("bio", "Short description up to 3000 characters long").isLength({ max: 3000 }),
    body("githubUsername", "GitHub username is required").optional(),
    body("linkedin", "LinkedIn is required").optional(),
    validateRequest,
    async (req, res, next) => {
        try {
         
            const userId = req.user._id;

            const existingUser = await getUserById(userId);
          

            if (!existingUser) {
                throw new Error("User not found.");
            }

            const { bio, githubUsername, linkedin } = req.body;
           
            const profileInputFields = {
                bio,
                githubUsername
            };

            if (linkedin) {
                profileInputFields.socialMedia = { linkedin };
            }

           
            const updatedProfile = await updateItem(userId, profileInputFields);
          
            return res.status(200).json(updatedProfile);

        } catch (error) {
            next(error);
        }
    }
);


router.delete("/delete", hasUser(),
    async (req, res, next) => {
        try {
            const existingProfile = await getUserById(req.user._id);

            if (!existingProfile) {
                throw new Error("Profile not found.");
            }

            const deleteProfile = await deleteById(req.user._id);

            res.status(200).json({ message: "The profile has been deleted." });

        } catch (error) {
            next(error);

        }
    })


module.exports = router;
