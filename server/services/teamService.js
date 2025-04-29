const Team = require("../models/Team");
const User = require("../models/User");


async function getAll() {
    return Team.find({}).populate("ownerId", ["name", "avatar"]);
}
async function getById(id) {
    return Team.findById(id);
}

async function getExistingUserByEmail(email) {
    return User.findOne({ email }).select("-hashedPassword");
}

async function getUseById(id) {
    return User.findById(id).select("-hashedPassword");
}

async function getTeamsByOwner(ownerId) {
    return await Team.find({ ownerId: ownerId }); 
}    


async function createItem(userId, data) {
    const newItem = await Team.create(data);
    await User.findByIdAndUpdate(userId, { $push: { teams: newItem._id } }, { new: true });
    
    return newItem;
}

async function createInvitation(userId, data) {
    await User.findByIdAndUpdate(userId, { $push: { sentInvitations: data } }, { new: true });
    await User.findByIdAndUpdate(data.userId, { $push: { receivedInvitations: userId } }, { new: true });
}


async function acceptInvitation(userId, teamId, teamOwnerId) {
    await Team.findByIdAndUpdate(teamId, { $push: { membersList: userId } }, { new: true });
    await User.findByIdAndUpdate(userId, { $pull: { receivedInvitations: teamOwnerId }}, {new: true });

    const teamOwner = await User.findById(teamOwnerId);
    const index = teamOwner.sentInvitations.findIndex(i => i.user == userId);

    teamOwner.sentInvitations.splice(index, 1);

    return teamOwner.save();
    
}

async function rejectInvitation(userId, teamOwnerId) {

    await User.findByIdAndUpdate(userId, { $pull: { receivedInvitations: teamOwnerId }}, {new: true });

    const teamOwner = await User.findById(teamOwnerId);
    const index = teamOwner.sentInvitations.findIndex(i => i.user == userId);

    teamOwner.sentInvitations.splice(index, 1);

    return teamOwner.save();
}    

async function leaveTeam(userId, teamId) {
    await Team.findByIdAndUpdate(teamId, { $pull: {membersList: userId} }, { new: true })

}






module.exports = {
    getAll,
    getById,
    getUseById,
    createItem,
    getExistingUserByEmail,
    createInvitation,
    acceptInvitation, 
    rejectInvitation,
    leaveTeam,
    getTeamsByOwner
}
