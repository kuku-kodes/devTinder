const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
        "mongodb+srv://kaushlendrakumarverma46:3kJuTwamhOE0LPc6@devtinder.1qzki3m.mongodb.net/devTinder"
    );
};

module.exports = connectDB;

