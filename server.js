const express = require("express");
const app = express();
const user = require("./Api/User");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware to get parsed json data from request
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/", checkApi());
app.use("/api/user", user);

app.get("/", (req, res) => {
    res.status(200).send("Done");
});

app.listen(PORT, () => {
    console.log(`Your app is running at ${PORT}`);
});
