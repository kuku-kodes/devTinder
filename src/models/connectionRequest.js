
const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
    },
},
{
    timestamps: true,
},
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    //check if the fromUserId is same as the toUserId 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection request to yourself!");
    }
    next();
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;

