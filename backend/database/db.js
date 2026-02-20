const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MONGODB DB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stops server if DB fails
  }
};

module.exports = { connection };