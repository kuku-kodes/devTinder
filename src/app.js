const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validatingSignupData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

// Adding a most important middleware to convert the upcomming request body from JSON object to jawascript object
app.use(express.json());
// Adding another most important middleware to convert/parese the upcoming request cookies into native language or in our case jawaScript object
app.use(cookieParser());

app.post("/signUp", async(req, res) => {

   

    // making our signup API dynamic to receive data from the end user 
   
    try{
        
    // Validation of data
    validatingSignupData(req);

    const {firstName, middleName, lastName, emailId, password, gender, age} = req.body;
    
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

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

app.post("/login", async (req, res) => {
    try{

        const {emailId, password} = req.body;

        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            // Create a JWT token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$3030");

            // Add the token to the cookie and send the response back to the user
            res.cookie("token", token);
            res.send("Login Successful!!");
        }else{
            throw new Error("Invalid credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

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

app.get("/profile", async (req, res) => {
    try{
    const cookies = req.cookies;

    const {token} = cookies;
    if(!token){
        throw new Error("Invalid Token");
    }

    // Validate my token
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$3030");
    
    const {_id} = decodedMessage;
    console.log("Logged in user is: " + _id);

    const user = await User.findOne({_id: _id});
    if(!user){
        throw new Error("User does not exist");
    }


    res.send(user);
}catch (err) {
    res.status(400).send("ERROR :" + err.message);
}
})

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
app.patch("/update/:userId", async(req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const ALLOWED_UPDATES = ["photoUrl", "skills", "gender", "about", "age"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update is not allowed"); 
    }
    if(data?.skills.length >10){
        throw new Error("Update is not al;owed");
    }
       const updatedUser = await User.findByIdAndUpdate({_id: userId}, data, {
        returnDocument: "after",
        runValidators: true,
       });
        res.send("User updated successfully");
        console.log(updatedUser);
    }catch(err) {
        res.status(400).send("Update Failed:" + err.message);
    }
});

// using PATCH API updating the user information through the emailId
app.patch("/updateByEmail", async(req,res) => {
    const userEmail = req.body.emailId;
    const data = req.body;
    try{

       const updatedUser = await User.findOneAndUpdate({emailId: userEmail}, data, {
        returnDocument: "after",
        runValidators: true,
    });
        res.send("User updated successfully");
        console.log(updatedUser);
    }catch(err) {
        res.status(400).send("Update Failed:" + err.message);
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


