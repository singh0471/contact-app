const User = require("../../user/service/user.js");
const admin1 = User.newAdmin("system","admin");


const getAllContactDetails = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            throw new Error("invalid id");

        const contactID = parseInt(req.params.contactID);

        if(isNaN(contactID))
            throw new Error("invalid contact id");

        const user = admin1.getStaffByID(userID);

        if(!user)
            throw new Error("user not found");      

        const allContactDetails = user.getAllContactDetailsByContactID(contactID);

        if(!allContactDetails)
            throw new Error("contact details not found");

        res.status(200).json(allContactDetails);
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const getContactDetailsByID = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);

        if(isNaN(userID))
            throw new Error("invalid user id");

        const contactID = parseInt(req.params.contactID);

        if(isNaN(contactID))
            throw new Error("invalid contact id");

        const id = parseInt(req.params.id);

        if(isNaN(id))
            throw new Error("invalid contact detail id");

        const user = admin1.getStaffByID(userID);
        if(!user)
            throw new Error("user not found");

        

        const contactDetail = user.getContactDetailByID(contactID,id);

        if(!contactDetail)
            throw new Error("contact detail not found");

        res.status(200).json(contactDetail);
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const newContactDetails = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);

        if(isNaN(userID))
            throw new Error("invalid user id");

        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            throw new Error("invalid contact id");
        

        const user = admin1.getStaffByID(userID);

        if(!user)
            throw new Error("user not found");

        

        const {type,value} = req.body;
        if(!type)
            throw new Error("invalid type");
        if(!value)
            throw new Error("invalid value");

        const contactDetails = user.addContactDetail(contactID,type,value);

        if(!contactDetails)
            throw new Error("could not create contact detail");

        res.status(200).json({message : "contact details successfully created"});
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const updateContactDetail = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);

        if(isNaN(userID))
            throw new Error("invalid user id");

        const contactID = parseInt(req.params.contactID);

        if(isNaN(contactID))
            throw new Error("invalid contact id");

        const id = parseInt(req.params.id);
        if(isNaN(id))
            throw new Error("invalid contact detail id");

        const {property,value} = req.body;

        if(!property)
            throw new Error("invalid property");
        if(!value)
            throw new Error("invalid value");

        const user = admin1.getStaffByID(userID);
        if(!user)
            throw new Error("user not found");

        

        const contactDetail = user.updateContactDetailByID(contactID,id,property,value);
        if(!contactDetail)
            throw new Error("could not update contact detail");

        res.status(200).json({message:`contact detail with id ${id} successfully updated`});
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const deleteContactDetails = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);

        if(isNaN(userID))
            throw new Error("invalid user id");

        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            throw new Error("invalid contact id");

        const id = parseInt(req.params.id);
        if(isNaN(id))
            throw new Error("invalid contact detail id");

        const user = admin1.getStaffByID(userID);
        if(!user)
            throw new Error("user not found");

        
        const contactDetail = user.deleteContactDetailByID(contactID,id);
        if(!contactDetail)
            throw new Error("could not delete contact detail");

        res.status(200).json({message : `contact detail with id ${id} has been deleted successfully`});
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

module.exports = {getAllContactDetails,getContactDetailsByID,newContactDetails,updateContactDetail,deleteContactDetails};