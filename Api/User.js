const express = require("express");
const User = require("../Model/User");
// const { check, validationResult } = require("express-validator");
require("dotenv").config();
const user = express.Router();

// check validation... (if !true => msg send)
// const validator = [check("name", "Name is invalid").not().isEmpty().isLength({ min: 4 }), check("contact", "Invalid Mobile Number.").isLength({ min: 10 }), check("email", "Please include a valid email").isEmail()];


// limited responses
/* user.get("/getData/:limit", async (req, res) => {
  const limitedUsers = await User.find().limit(req.params.limit).sort({ created: -1 });
  res.status(200).json(limitedUsers);
}); */

// Sorting in ascending order

user.post("/register", (req, res) => {
  // check if any validation is not true then send error
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json({ error: errors.errors });
  // }

  // creating user to send message to server
  const createUser = async () => {
    // getting all data from req. using destructuring array
    const {firstName,
      lastName,
      email,
      phoneNumber,
      message, } = req.body;

    // if any error occurred then catch
    try {
      // set all new data for user to store in database
      const userData = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      });

      // everything okay, save user in database
      await userData.save();
      res.status(200).json(userData);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  // call asynchronous create user FN.
  createUser();
});

// delete record from database
user.post("/deleteRecord", (req, res) => {
  // req.query.delete
  const deleteRecordFn = async () => {
    const deletedUser = await User.findByIdAndDelete({ _id: req.query.delete });
    if (deletedUser) {
      res.status(200).json({ deletedUser: deletedUser });
    } else {
      res.status(404).json({ msg: "User not deleted" });
    }
  };
  deleteRecordFn();
});

module.exports = user;
