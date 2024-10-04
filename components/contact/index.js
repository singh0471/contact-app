const express = require("express");
const contactDetailsRouter = require("../contactDetails");
const contactRouter = express.Router({ mergeParams: true });
const {getAllContacts,getContactsByID,updateContact,newContact,deleteContact} = require("./controller/controller.js");
const user = require("../user/service/user.js");


// get all contact ->
contactRouter.get("/",getAllContacts);

// get contact by id.
contactRouter.get("/:id",getContactsByID);

// create contact
contactRouter.post("/",newContact);

// update contact
contactRouter.put("/:id",updateContact);

// delete contact
contactRouter.delete("/:id",deleteContact);

//

contactRouter.use("/:contactID/contactDetails",contactDetailsRouter);
module.exports = contactRouter;