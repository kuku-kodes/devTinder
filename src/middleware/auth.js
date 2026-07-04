// const adminAuth = (req, res, next) => {
//     console.log("Admin auth is getting checked...");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized request");
//     }else{
//         next();
//     }
// }

const jwt = require('jsonwebtoken');
const User = require('../models/user');


const userAuth = async (req, res, next) => {

    try {
    // Read the token from the request cookie

    const {token} = req.cookies;

    if(!token){
        return res.status(401).send("Unauthorized: Please login!");
    }

   // Validate the token
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);

    const {_id} = decodedObj;
    // console.log("Logged in User is : " + _id);

    // find the user
    const user = await User.findById(_id);
    if(!user){
        return res.status(401).send("Unauthorized: User not found!");
    }
    req.user = user;
    next();
} catch (err){
   res.status(400).send("ERROR: " + err.message);
}
}

module.exports = {
    // adminAuth,
    userAuth
};