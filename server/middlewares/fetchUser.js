require ('dotenv').config();
const jwt = require("jsonwebtoken");

const fetchUser = async (req,res,next) => {
    let token = req.header('Authorization');
     
    if(!token) {
        token = req.header('auth-token');
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"});
        }
    } else {
        try {
            const data = jwt.verify(token, process.env.JWT_SECRET); 
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

module.exports = { fetchUser };