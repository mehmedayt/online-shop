const express = require("express");
const connectDB = require("./config/db");
const expressConfig = require("./config/express");

const app = express();
const port = 4000;

expressConfig(app);

connectDB();


app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port " + port);
    } else {
        console.log("Error: " + error);
    }
});
