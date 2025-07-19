
const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth")
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName middlename lastName gender photoUrl skills about";

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

userRouter.get("/user/connections",userAuth, async(req, res) => {
    try{

       const loggedInUser = req.user;

       const connectionRequests = await ConnectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id, status: "accepted"},
            {fromUserId: loggedInUser._id, status: "accepted"}
        ]
       }).populate("fromUserId", USER_SAFE_DATA)
         .populate("toUserId", USER_SAFE_DATA);

         const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
         });

     res.json({data});

    }catch(err){
        return res.status(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/feed", userAuth , async (req, res) => {
    try{

        const loggedInUser = req.user;
        
        // feed should contain all the cards except 
        // the loggedInUser himself
        // the connection request accepted & intrested
        // the request which are ignoured 
        // the request which are send or received

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id}, 
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        }).select(USER_SAFE_DATA);

     res.json({users})

    }catch(err){
        return res.status(400).send("ERROR: " + err.message);
    }
})

module.exports = userRouter;