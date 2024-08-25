const express = require("express");
const { addProduct, removeProduct, getAllProducts, getNewCollection, getPopular, addToCart } = require("../controllers/productController");
const upload = require("../config/multer");
const { fetchUser } = require("../middlewares/fetchUser");
const router = express.Router();
const PORT = 4000;

router.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

router.post('/addproduct', addProduct);
router.post('/removeproduct', removeProduct);
router.get('/allproducts', getAllProducts);
router.get('/newcollection', getNewCollection);
router.get('/popularinwomen', getPopular);
router.post('/addtocart', fetchUser, addToCart);

module.exports = router;