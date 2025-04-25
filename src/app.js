const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "Kaushlendra", lastName: "Verma", gender: "Male"});
});

app.post("/user", (req, res) => {
    // assume that a logic is written here for savong data to the dataBase
    res.send("Data is succesfully saved to the database");
});

app.delete("/user" , (req, res) => {
    res.send("Deleted succesfully");
});

app.use("/hello", (req, res) => {
    res.send("hello is Successful!!");
});



app.listen(3030, () => {
    console.log("Server is succesfully listening on port 3030...");
});