const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("hello is Successful!!");
});

app.use("/test", (req, res) => {
    res.send("test is Successful!!!");
});

app.use("/", (req, res) => {
    res.send("Namast");
});


app.listen(3030, () => {
    console.log("Server is succesfully listening on port 3030...");
});