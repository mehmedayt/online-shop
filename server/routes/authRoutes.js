const express = require('express');
const { signup, login, changePassword } = require('../controllers/authController');
const { fetchUser } = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', fetchUser ,changePassword);


module.exports = router;
