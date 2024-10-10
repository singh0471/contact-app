const express = require("express");
const contactRouter = require("../contact");
const {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser} = require("./controller/controller.js");
const userRouter = express.Router();
const {verifyAdmin,verifyStaff} = require("../../middleware/authorization.js");

//  create admin



// get all users
userRouter.get("/",verifyAdmin,getAllUsers);

// get users by id ->
userRouter.get("/:id",verifyAdmin,getUserByID);

// create users ->
userRouter.post("/",verifyAdmin,createNewUser);

// update user ->
userRouter.put("/:id",verifyAdmin,updateUser);

//delete users ->
userRouter.delete("/:id",verifyAdmin,deleteUser);


userRouter.use("/:userID/contact",verifyStaff,contactRouter);
module.exports = userRouter;