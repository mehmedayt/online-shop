const express = require("express");
require('dotenv').config();
const connectDB = require("./config/db");
const expressConfig = require("./config/express");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 4000;

expressConfig(app);

connectDB();

app.use("/", productRoutes);
app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Express App is Running");
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
