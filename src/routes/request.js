const express = require('express');

const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        // checking for alllowed status
        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
           return res.status(400).json({message: "Invalid status type: " + status });
        }

        // checking if the user is in the database or not 
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found!" });
        }

        // IF there is an existing connection check
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message: "This Connection Already exists!!"});
        };

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        const data = await connectionRequest.save();

        res.json({
            message: "Connecrion Request Sent Successfully!!",
            data,
        });

    }catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
    

});

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req,res) => {
    try{

        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        //Validate the status

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not allowed!"});
        }

        //requwst should be from sender => receiver only
        //loggedInId == toUserId
        // satatus = interested
        // requestId should be valid
        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });
        if(!connectionRequest){
          return res.status(404).json({message: "Connection request not found"});  
        };

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            message: "Connection request " + 
            status, 
            data,
        });

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})


module.exports = requestRouter;