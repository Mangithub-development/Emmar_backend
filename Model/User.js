const mongoose = require("mongoose");
require("dotenv").config();

const MongoURI = process.env.MONGO_URL
// connection with mongoose
mongoose
    .connect(MongoURI)
    .then(() => console.log("Connected to mongoDB"))
    .catch((err) => console.error("could not connect to db.", err));

// creating user schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

// create a userData named collection
const userData = mongoose.model("user", userSchema);

module.exports = userData;
