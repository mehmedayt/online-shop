const express = require('express');
const { signup, login, changePassword, deleteAccount, changeEmail } = require('../controllers/authController');
const { fetchUser } = require('../middlewares/fetchUser');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', fetchUser ,changePassword);
router.delete('/deleteAccount', fetchUser ,deleteAccount);
router.post('/changeEmail', fetchUser, changeEmail);


module.exports = router;
