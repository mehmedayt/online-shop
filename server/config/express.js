const express = require("express");
const cors = require("cors");

const expressConfig = (app) => {
    app.use(express.json());
    app.use(cors());
    app.use('/images', express.static('upload/images'));
};

module.exports = expressConfig;
