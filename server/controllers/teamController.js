const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { getTeamsByOwner, getById, createItem, getExistingUserByEmail, createInvitation, getUseById, acceptInvitation, rejectInvitation, leaveTeam } = require("../services/teamService");


router.get("/",  async (req, res, next) => {
    try {
        const teams = await getTeamsByOwner(req.user._id);
        
        if (teams.length === 0) {
            return res.status(404).json({ message: "No teams found for current user" });
        }
        
        res.json(teams);

    } catch (error) {
       next(error);
    }
});

router.post("/create",
    body("name", "Name is required").not().isEmpty(),
    body("name", "Please enter a name up to 30 characters long").isLength({ max: 30 }),
    async (req, res, next) => {
        try {
            const userId = req.user._id;
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            const team = {
                name: req.body.name,
                ownerId: req.user._id,
            };

            const createdTeam = await createItem(userId, team);

            res.json(createdTeam);

        } catch (error) {
           next(error);
        }

    }
);


router.post("/:id/send-invitation",
    body("email", "Email is required").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            const teamId = req.params.id;
            const userId = req.user._id;
            const inputEmail = req.body.email;

            const existingUser = await getExistingUserByEmail(inputEmail);
            if (!existingUser) {
                return res.status(404).json({ message: "The user does not exist" });
            }

            const team = await getById(teamId);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }

            if (existingUser._id.toString() === userId.toString()) {
                return res.status(400).json({ message: "It looks like you're the admin of this team" });
            }

            const isTeamOwner = team.ownerId.toString() === userId.toString();
            if (!isTeamOwner) {
                return res.status(403).json({ message: "No credentials available" });
            }

            const isTeamMember = team.membersList.some(
                member => member.toString() === existingUser._id.toString()
            );
            if (isTeamMember) {
                return res.status(400).json({ message: "User is already on your team" });
            }

            const member = {
                email: inputEmail,
                userId: existingUser._id,
            };
            
            await createInvitation(userId, member);
            return res.status(200).json({ message: `Invitation sent to ${member.email}` });

        } catch (error) {
           next(error);
        }
    }
);

router.post("/:id/accept-invitation",
    async (req, res, next) => {
        try {
            const teamId = req.params.id;
            const userId = req.user._id;

            const user = await getUseById(userId);
            const team = await getById(teamId);

            const isInvitation = user.receivedInvitations.some(user => user._id.equals(team.ownerId));

            if (!isInvitation) {
                return res.status(400).json({ message: "Sorry, you are not invited" });
            }

            const isTeamMember = team.membersList.map((member) => member.toString()).includes(userId.toString());

            if (isTeamMember == true) {
                return res.status(400).json({ message: "You are already a member of this team" });
            }


            await acceptInvitation(userId, team._id, team.ownerId);

            return res.status(200).json({ message: "Invitation accepted" });


        } catch (error) {
           next(error);
        }

    });


router.post("/:id/reject-invitation", async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const userId = req.user._id;

        const user = await getUseById(userId);
        const team = await getById(teamId);

        const isInvitation = user.receivedInvitations.some(user => user._id.equals(team.ownerId));

        if (!isInvitation) {
            return res.status(400).json({ message: "Sorry, you are not invited" });
        }

        await rejectInvitation(userId, team.ownerId);

        return res.status(200).json({ message: "Invitation rejected" });

    } catch (error) {
       next(error);
    }
})


router.post("/:id/leave", async (req, res, next) => {
    try {
        const teamId = req.params.id;
        const userId = req.user._id;

        const team = await getById(teamId);
        const isTeamOwner = team.ownerId == userId;

        if(!team) {
            throw errors;
        }

        if (isTeamOwner) {
            return res.status(400).json({ message: "You're the team admin" });
        }

        const isTeamMember = team.membersList.map((member) => member.toString()).includes(userId.toString());

        if (isTeamMember == false) {
            return res.status(400).json({ message: "You are not part of this team" });
        }


        await leaveTeam(userId, team._id);

        return res.status(200).json({ message: `Please be advised that you are leaving team ${team.name}` });

    } catch (error) {
       next(error);
    }
})

router.post("/remove/:teamId/:memberId", async(req, res, next) => {
    try {
        const teamId = req.params.teamId;
        const memberId = req.params.memberId;
        const userId = req.user._id;

        //console.log("team id", teamId)
        //console.log("member", memberId)

        const team = await getById(teamId);
        const isTeamOwner = team.ownerId == userId;
        //console.log(isTeamOwner)

        if(!team || team.membersList.length == 0) {
            throw errors;
        }

        if (!isTeamOwner) {
            return res.status(400).json({ message: "No credentials" });
        }

        const isTeamMember = team.membersList.map((member) => member.toString()).includes(memberId.toString());

        if (isTeamMember == false) {
            return res.status(400).json({ message: "You are not part of this team" });
        }

        await leaveTeam(memberId, teamId);

        res.status(200).json({ message: "Team member removed"})
        

    } catch (error) {
       next(error);
    
    }
})




module.exports = router;