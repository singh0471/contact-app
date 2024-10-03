const express = require("express");
const contactRouter = require("../contact");
const {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser} = require("./controller/controller.js");
const userRouter = express.Router();

// get all users
userRouter.get("/",getAllUsers);

// get users by id ->
userRouter.get("/:id",getUserByID);

// create users ->
userRouter.post("/",createNewUser);

// update user ->
userRouter.put("/:id",updateUser);

//delete users ->
userRouter.delete("/:id",deleteUser);


userRouter.use("/:userID/contact",contactRouter);
module.exports = userRouter;