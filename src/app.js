const express = require("express");

const app = express();

app.get("/user",
     (req, res, next) => {
    console.log("calling first response");
    // res.send("response!!");
    next();
    
    
},
(req, res, next) => {
    console.log(" calling second responses");
    res.send("2nd response!!");
}
);




app.listen(3030, () => {
    console.log("Server is succesfully listening on port 3030...");
});