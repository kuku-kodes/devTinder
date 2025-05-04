const express = require("express");

const app = express();

const { adminAuth , userAuth } = require("./middleware/auth");



app.use("/admin", adminAuth);

app.get("/admin/getAllData", 
    (req, res, next) => {
   res.send("All Data Sent");
});

app.get("/admin/deleteUser", 
    (req, res, next) => {
   res.send("Deleted a User");
});

app.get("/user", userAuth,
     (req, res, next) => {
    console.log("calling first response");
    // res.send("response!!");
    next();   
},
(req, res, next) => {
    console.log(" calling second responses");
    next();     // in which line the command is written matters , so due to next() command written above  the response command the third response will be called, not the second.
    res.send("2nd response!!"); // here the error will be send , it might not creat big impact but we must not ignore these error. 
    
},
[(req, res, next) => {
    console.log(" calling third responses");
    res.send("3rd response!!");
    next();
}, 
(req, res, next) => {
    //now because the third command is already excuted, it will not go to the forth commmand.
    console.log(" calling forth responses"); 
    res.send("4th response!!");
}]
);

app.post("/user/login", 
    (req, res, next) => {
        res.send("User logged in successfully");
    }
);




app.listen(3030, () => {
    console.log("Server is succesfully listening on port 3030...");
});