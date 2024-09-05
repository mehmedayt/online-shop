const User = require('../models/User');
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "User exists!" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword, 
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

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const passCompare = await bcrypt.compare(req.body.password, user.password);
            if (passCompare) {
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const token = jwt.sign(data, process.env.JWT_SECRET || 'secret_onlstore');
                res.json({ success: true, token });
            } else {
                res.status(400).json({ success: false, errors: 'Wrong password' });
            }
        } else {
            res.status(400).json({ success: false, errors: 'Wrong email id' });
        }
    } catch (error) {
        res.status(500).json({ success: false, errors: 'Server error' });
    }
};

exports.changePassword = async(req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
}

exports.deleteAccount = async (req, res) => {
    console.log('from controller');
    
  
};