const express = require("express");
const { addProduct, removeProduct, getAllProducts } = require("../controllers/productController");
const upload = require("../config/multer");

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

module.exports = router;