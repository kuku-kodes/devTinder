const express = require('express');

const authRouter = express.Router();
const {validatingSignupData} = require("../utils/validation")
const bcrypt = require("bcrypt")
const User = require("../models/user");
const jwt = require("jsonwebtoken");


authRouter.post("/signUp", async(req, res) => {

   

    // making our signup API dynamic to receive data from the end user 
   
    try{
        
    // Validation of data
    validatingSignupData(req);

    const {firstName, middleName, lastName, emailId, password, gender, age} = req.body;
    
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    // Creating a instence of the user model
    const user = new User({
        firstName,
        middleName,
        lastName,
        emailId,
        password: passwordHash,
        gender,
        age,
    });
    console.log(req.body);

    await user.save();
    res.send("User added succesfully");
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }

});

authRouter.post("/login", async (req, res) => {
    try{

        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            // Create a JWT token
            // const token = await jwt.sign({_id: user._id}, "DEV@Tinder$3030", { expiresIn: '1d'}); // this token will be expired in 1 day
            const token = await user.getJWT();

            // Add the token to the cookie and send the response back to the user
            res.cookie("token", token , {expires: new Date(Date.now() + 8 * 3600000)});// this cookie will expire in 8 hours
            res.send(user);
        }else{
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

authRouter.post("/logout", async (req,res) => {
    res.cookie("token", null , {expires: new Date(Date.now()) // the token expiry time was set to now current time, as soon as the request hits the token expires
  });
   res.send("Logout Succesful!!");
})
// we can chain the process exp: res.cookie({}).send("logout succesfull");

module.exports = authRouter;