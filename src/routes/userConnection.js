
const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser,
            status: "interested",
        }).populate(
            "fromUserId",
            "firstName middleName lastName gender photoUrl about skills"
        );

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = userRouter;