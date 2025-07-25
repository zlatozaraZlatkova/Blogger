const router = require("express").Router();
const { body } = require("express-validator");

const validateRequest = require("../middlewares/validateBodyRequest");
const { hasUser } = require("../middlewares/guards");
const { getUserById, createItem, updateItem, deleteById, getProfileById, followProfile, getProfileByIdSimple } = require("../services/profileService");


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

router.get("/public/:id", hasUser(),
    async (req, res, next) => {

        try {
            const requestedUserId = req.params.id;
           
            const publicProfile = await getProfileById(requestedUserId);

            if (!publicProfile) {
                throw new Error("Public profile not found.");
            }

            res.status(200).json(publicProfile);

        } catch (error) {
            next(error);

        }
    })

router.post("/public/:id/follow", hasUser(),
    async (req, res, next) => {
        try {
            const requestedUserId = req.params.id;
            const userId = req.user._id

            const publicProfile = await getProfileByIdSimple(requestedUserId);
          
        
            if (!publicProfile) {
                throw new Error("Public profile not found.");
            }

            if (publicProfile.ownerId.toString() == userId.toString()) {
                throw new Error("Not able to follow your own profile.");
            }

            if (publicProfile.followerList.some(user => user._id.equals(req.user._id))) {
                throw new Error("You are already following this profile.");
            }

            const updatedProfile = await followProfile(requestedUserId, userId);

            return res.status(200).json({ message: "Followed!" });


        } catch (error) {
            next(error);
        }
    }
);


router.post("/create", hasUser(),
    body("bio", "Short bio is required").notEmpty(),
    body("bio", "Short description up to 3000 characters long").isLength({ max: 3000 }),
    body("githubUsername", "GitHub username is required").optional(),
    body("socialMedia.linkedin", "LinkedIn is required").optional(),
    validateRequest,
    async (req, res, next) => {

        try {
            const userId = req.user._id;
            let publicProfile = await getUserById(userId);


            if (publicProfile) {
                throw new Error("Profile already exists.");
            }

             const { bio, githubUsername, socialMedia } = req.body;
           
            const profileInputFields = {
                bio,
                githubUsername,
                ownerId: userId
            };

            if (socialMedia?.linkedin) {
                profileInputFields.socialMedia = { linkedin: socialMedia.linkedin };
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
    body("socialMedia.linkedin", "LinkedIn is required").optional(),
    validateRequest,
    async (req, res, next) => {
        try {
         
            const userId = req.user._id;

            const existingUser = await getUserById(userId);
          

            if (!existingUser) {
                throw new Error("User not found.");
            }

            const { bio, githubUsername, socialMedia } = req.body;
           
            const profileInputFields = {
                bio,
                githubUsername
            };

            if (socialMedia?.linkedin) {
                profileInputFields.socialMedia = { linkedin: socialMedia.linkedin };
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
