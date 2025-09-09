const express = require('express');

const profileRouter = express.Router();
const {validateEditProfileData} = require('../utils/validation');
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile/view",userAuth, async (req, res) => {
    try{
        const user = req.user;

    res.send(user);
}catch (err) {
    res.status(400).send("ERROR :" + err.message);
}
});

profileRouter.patch("/profile/edit",userAuth, async (req, res) => {
    try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
       }

       const loggedInUser = req.user;

       loggedInUser.save();

       Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
       

       res.send({
         message : `${loggedInUser.firstName}, your profile updated successfully`,
         data : loggedInUser,
       }
       )

}catch (err) {
    res.status(400).send("ERROR :" + err.message);
}
});

profileRouter.get("/user", async(req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId: userEmail})
        console.log(user);
        if(user.length === 0){
            res.send("User not found");
        }else{
            res.send(user);
        }
    }catch(err) {
        res.status(400).send("Something went wrong!!!");
    }
});

module.exports = profileRouter;