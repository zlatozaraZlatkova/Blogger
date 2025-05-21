const Newsletter = require("../models/Newsletter");

async function getExistingEmail(userEmail) {
  const newsletter = await Newsletter.findOne({
    subscriptionList: userEmail,
  });

  return newsletter !== null;
}

async function signup(email) {
  const newsletter = await Newsletter.findOneAndUpdate(
    {},
    { $addToSet: { subscriptionList: email } },
    { new: true, upsert: true }
  );

  return newsletter;
}

async function unsubscribed(email) {
  const newsletter = await Newsletter.findOneAndUpdate(
    {},
    { $pull: { subscriptionList: email } },
    { new: true }
  );

  return newsletter;
}

module.exports = {
  getExistingEmail,
  signup,
  unsubscribed,
};
