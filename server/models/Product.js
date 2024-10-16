const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],  
        minlength: [3, "Product name must be at least 3 characters"],  
        maxlength: [50, "Product name cannot exceed 50 characters"],  
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["Men", "Women", "Kids", "Accessories"],
            message: "Category must be one of: Men, Women, Kids, Accessories"
        }
    },
    new_price: {
        type: Number,
        required: [true, "New price is required"],
        min: [0, "Price must be a positive number"]  
    },
    old_price: {
        type: Number,
        required: [true, "Old price is required"],
        validate: {
            validator: function(v) {
                return v >= this.new_price;  
            },
            message: "Old price must be greater than or equal to the new price"
        }
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
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    ratings: [
        {
            userEmail: {
                type: String,
                match: [/.+\@.+\..+/, "Please enter a valid email"] 
            },
            rating: { 
                type: Number, 
                min: [1, "Rating must be at least 1"], 
                max: [5, "Rating cannot exceed 5"] 
            },
            createdAt: { 
                type: Date, 
                default: Date.now 
            }
        }
    ]
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
