const express = require("express");
const contactDetailsRouter = require("../contactDetails");
const contactRouter = express.Router();
const {getAllContacts} = require("./controller/controller.js");
const user = require("../user/service/user.js");
//const user = require("../user/service/user.js");

// get all contact ->
contactRouter.get("/",getAllContacts);

//




contactRouter.use("/:contactID/contactDetails",contactDetailsRouter);
module.exports = contactRouter;