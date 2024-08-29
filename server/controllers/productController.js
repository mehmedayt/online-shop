import("dotenv");
const Product = require("../models/Product");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");

const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products[products.length - 1].id + 1 : 38;

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log("Product saved:", product);
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      errors: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product removed:", req.body.id);
  res.json({
    success: true,
    name: req.body.name,
  });
};

const getAllProducts = async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
};

const getNewCollection = async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetched");
  res.send(newcollection);
};

const getPopular = async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popularInWomen = products.slice(0, 4);
  console.log("Popular in Women Fetched");
  res.send(popularInWomen);
};

const addToCart = async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
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

const getCart = async (req, res) => {
  console.log("GetCart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};

sgMail.setApiKey(process.env.SEND_GRID_API);

const subscribe = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  const msg = {
    to: email,
    from: "mehmed_ayt@abv.bg",
    subject: "Thank You for Subscribing!",
    text: `Hello, \n\nThank you for subscribing to our newsletter! You'll now receive the latest updates, promotions, and news directly in your inbox.\n\nBest regards,\nYour Team`,
};

  try {
    await sgMail.send(msg);
    res.status(200).send("Subscription successful");
  } catch (error) {
    console.error("SendGrid Error:", error.response.body);
    res.status(500).send("Error subscribing");
  }
};
const sendOrderEmail = async (req, res) => {
    try {
      let email = req.body.email;
      let productNames = "";
      let price = 0;
  
      if (!Array.isArray(req.body.cartItems) || req.body.cartItems.length === 0) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }
  
      for (let i = 0; i < req.body.cartItems.length; i++) { 
            if (req.body.cartItems[i]) {
          productNames += " + " + req.body.cartItems[i]?.name;
          price += req.body.cartItems[i]?.total;
        }
      }
  
      const msg = {
        to: email,
        from: "mehmed_ayt@abv.bg", 
        subject: "Order Confirmation",
        text: `Thank you for your order! Here are the details:\n\n${productNames}\n\nTotal Amount: $${price}\n\nOur team will get in touch with you shortly to finalize the process.`,
      };
  
      await sgMail.send(msg);
  
      res.status(200).json({ success: true, message: "Order placed!" });
    } catch (error) {
      console.error("Error sending order email:", error);
      res.status(500).json({ success: false, message: "Error processing order" });
    }
  };

  const submitRating = async (req, res) => {
    const { productId, userEmail, rating } = req.body;
    
    try {
      const product = await Product.findById(productId);
      if (!product) {
            return res.status(404).send('Product not found');
        }
        
        const existingRatingIndex = product.ratings.findIndex(r => r.userEmail === userEmail);
        if (existingRatingIndex !== -1) {

          product.ratings[existingRatingIndex].rating = rating;
        } else {

          product.ratings.push({ userEmail, rating });
        }

        await product.save();
        
        const totalRating = product.ratings.reduce((acc, r) => acc + r.rating, 0);
        const averageRating = product.ratings.length ? totalRating / product.ratings.length : 0;
        
        res.json({ averageRating });
    } catch (error) {
        res.status(500).send('Server error');
    }
};
  
module.exports = {
  addProduct,
  removeProduct,
  getAllProducts,
  getNewCollection,
  getPopular,
  addToCart,
  removeFromCart,
  getCart,
  subscribe,
  sendOrderEmail,
  submitRating
};
