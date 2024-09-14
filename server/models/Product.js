const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    image: {
        type: String,
        required: true,  
    },
    category: {
        type: String,
        required: true,  
    },
    new_price: {
        type: Number,
        required: true,  
    },
    old_price: {
        type: Number,
        required: true,  
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        default: "High-quality, comfortable, and stylish clothing designed for everyday wear.",
    },
    ratings: [
        {
            userEmail: String,
            rating: { type: Number, min: 1, max: 5 },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
