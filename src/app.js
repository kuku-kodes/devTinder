const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

// Adding a most important middleware to convert the upcomming request body from JSON object to jawascript object
app.use(express.json());

app.post("/signUp", async(req, res) => {
    // making our signup API dynamic to receive data from the end user 
    const user = new User(req.body);
    console.log(req.body);

    try{
    await user.save();
    res.send("User added succesfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
    }

});

app.get("/user", async(req, res) => {
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

app.get("/feed" , async(req, res) => {
    const users = req.body.emailId;

    try{
        const user = await User.find({});
        console.log(user);
        res.send(user); 
    }catch(err) {
        res.status(400).send("Something went wrong!!!");
    }
}) 

// Deleting the user from the database using the DELETE API
app.delete("/delete", async(req,res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId});
        res.send("User successfully deleted");
    }catch(err) {
        res.status(400).send("Something went wrong!!!");
    }
});

// using PATCH API updating the users information through the userID
app.patch("/update", async(req,res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
       const updatedUser = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "after"});
        res.send("User updated successfully");
        console.log(updatedUser);
    }catch(err) {
        res.status(400).send("Something went wrong!!!");
    }
});

// using PATCH API updating the user information through the emailId
app.patch("/updateByEmail", async(req,res) => {
    const userEmail = req.body.emailId;
    const data = req.body;
    try{
       const updatedUser = await User.findOneAndUpdate({emailId: userEmail}, data, {returnDocument: "after"});
        res.send("User updated successfully");
        console.log(updatedUser);
    }catch(err) {
        res.status(400).send("Something went wrong!!!");
    }
});


connectDB()
.then(() => {
    console.log("DataBase connection established...");
    app.listen(3030, () => {
        console.log("Server is succesfully listening on port 3030...");
    });
})
.catch((err) => {
    console.error("DataBase cannot be connected!!!");
});


