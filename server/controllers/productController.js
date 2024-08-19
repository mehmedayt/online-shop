const Product = require("../models/Product");

const addProduct = async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price
    });

    await product.save();
    console.log("Product saved:", product);
    res.json({
        success: true,
        name: req.body.name
    });
};


module.exports = { addProduct };
