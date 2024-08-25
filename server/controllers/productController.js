const Product = require("../models/Product");
const User = require('../models/User');

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

const removeProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product removed:", req.body.id);
    res.json({
        success: true,
        name: req.body.name
    });
};

const getAllProducts = async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
};

const getNewCollection = async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
}

const getPopular = async (req,res)=>{
    let products = await Product.find({category:"women"});
    let popularInWomen = products.slice(0,4);
    console.log("Popular in Women Fetched");
    res.send(popularInWomen);
};

const addToCart = async (req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await User.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
};

const removeFromCart = async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  };
  
module.exports = { addProduct, removeProduct, getAllProducts, getNewCollection, getPopular, addToCart, removeFromCart};
