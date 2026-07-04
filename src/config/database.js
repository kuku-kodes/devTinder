// const mongoose = require("mongoose");

// const connectDB = async() => {
//     await mongoose.connect(
//         "mongodb+srv://kaushlendrakumarverma46:3kJuTwamhOE0LPc6@devtinder.1qzki3m.mongodb.net/devTinder"
//     );
// };

// module.exports = connectDB;

// src/config/database.js


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1); // Stop the app if database fails
  }
};

module.exports = connectDB;