const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signUp", async(req, res) => {
    const user = new User({
        firstName: "Abhinav",
        lastName: "Yadav",
        emailId: "abhinavyadav@gmail.com",
        password: "everything123"
    });

    try{
    await user.save();
    res.send("User added succesfully");
    } catch (err) {
        res.status(400).send("Error saving the user:" + err.message);
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


