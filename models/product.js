const mongoose = require("mongoose");

// Define the schema for products
const productSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Assuming images are stored as an array of strings
        required: true
    },
    category: {
        type: String,
        required: true
    },
    priceRange: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ADMIN" // Assuming there's a User model for the user who posted the product
    }
}, { timestamps: true });

// Create the model for products
const Product = mongoose.model("products", productSchema);

module.exports = Product;
