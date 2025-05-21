const { Schema, model } = require("mongoose");

const newsletterSchema = new Schema(
  {
    subscriptionList: {
      type: String,
      required: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
        "Email is invalid",
      ],
    },
  },
  { timestamps: true }
);

newsletterSchema.index(
  { email: 1 },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const Newsletter = model("Newsletter", newsletterSchema);

module.exports = Newsletter;
