const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cors = require('cors')
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/auth");


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Adding a most important middleware to convert the upcomming request body from JSON object to jawascript object
app.use(express.json());
// Adding another most important middleware to convert/parese the upcoming request cookies into native language or in our case jawaScript object
app.use(cookieParser());

// WE CAN NOW MAKE USE OF userAuth A MIDDLEWARE FOR AUTHONTICATION makin it very easy to authonticate any API 
const authRouter = require('../src/routes/auth');
const profileRouter = require('../src/routes/profile');
const requestRouter = require('../src/routes/request');
const userRouter = require("../src/routes/userConnection");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/feed" , async(req, res) => {
//     const users = req.body.emailId;

//     try{
//         const user = await User.find({});
//         console.log(user);
//         res.send(user); 
//     }catch(err) {
//         res.status(400).send("Something went wrong!!!");
//     }
// }) 

// // Deleting the user from the database using the DELETE API
// app.delete("/delete", async(req,res) => {
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete({_id: userId});
//         res.send("User successfully deleted");
//     }catch(err) {
//         res.status(400).send("Something went wrong!!!");
//     }
// });

// // using PATCH API updating the users information through the userID
// app.patch("/update/:userId", async(req,res) => {
//     const userId = req.params?.userId;
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES = ["photoUrl", "skills", "gender", "about", "age"];
//         const isUpdateAllowed = Object.keys(data).every((k) => 
//             ALLOWED_UPDATES.includes(k)
//     );
//     if(!isUpdateAllowed){
//         throw new Error("Update is not allowed"); 
//     }
//     if(data?.skills.length >10){
//         throw new Error("Update is not al;owed");
//     }
//        const updatedUser = await User.findByIdAndUpdate({_id: userId}, data, {
//         returnDocument: "after",
//         runValidators: true,
//        });
//         res.send("User updated successfully");
//         console.log(updatedUser);
//     }catch(err) {
//         res.status(400).send("Update Failed:" + err.message);
//     }
// });

// // using PATCH API updating the user information through the emailId
// app.patch("/updateByEmail", async(req,res) => {
//     const userEmail = req.body.emailId;
//     const data = req.body;
//     try{

//        const updatedUser = await User.findOneAndUpdate({emailId: userEmail}, data, {
//         returnDocument: "after",
//         runValidators: true,
//     });
//         res.send("User updated successfully");
//         console.log(updatedUser);
//     }catch(err) {
//         res.status(400).send("Update Failed:" + err.message);
//     }
// });


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


