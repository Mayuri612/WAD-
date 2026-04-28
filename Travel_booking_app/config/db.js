const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:x7Epqfue03sAsTjr@travelbooking.4acqd6f.mongodb.net/?appName=travelbooking");
    console.log("MongoDB Connected Successfully 🚀");
  } catch (error) {
    console.log("DB Connection Failed ❌", error);
  }
};

module.exports = connectDB;