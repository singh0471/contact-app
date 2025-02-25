const express = require("express");
const contactDetailsRouter = express.Router({ mergeParams: true });

const {getAllContactDetails,getContactDetailsByID,newContactDetails,updateContactDetail,deleteContactDetails} = require("./controller/controller.js")

// all contact details
contactDetailsRouter.get("/",getAllContactDetails);

// all contact details by id
contactDetailsRouter.get("/:id",getContactDetailsByID);

// new contact details 
contactDetailsRouter.post("/",newContactDetails);

// update contact details
contactDetailsRouter.put("/:id",updateContactDetail);

// delete contact details
contactDetailsRouter.delete("/:id",deleteContactDetails);

module.exports = contactDetailsRouter;