const mongoose = require("mongoose");
const MONGODB_URI = 'mongodb://localhost:27017/reactProject'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed: ", err);
        process.exit(1);
    }
};

module.exports = connectDB;
