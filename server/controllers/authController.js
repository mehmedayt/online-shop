const User = require('../models/User');
require ('dotenv').config();
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User exist!" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        };

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart
        });

        await user.save();

        const data = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ success: true, token });

    } catch (error) {
        res.status(500).json({ success: false, errors: 'Error' });
    }
};