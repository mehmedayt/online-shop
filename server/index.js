const PORT = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/react-shop');

app.listen(PORT, (err) => {
    if(!err){
        console.log("Server is Running on Port: " + PORT);
    }else{
        console.log("ERROR: " + err);
    }
});