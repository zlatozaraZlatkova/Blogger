const mongoose = require("mongoose");
require("dotenv").config();

const databaseURI = process.env.DATABASE;

module.exports = async (app) => {
  try {
    await mongoose.connect(databaseURI);
    console.log("MongoDB connected successfully!");
    
  } catch (err) {
    console.log(`Error initializing DB: ${err.message}`);
    process.exit(1);
  }
};