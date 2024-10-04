const User = require("../../user/service/user.js");
const admin1 = User.newAdmin("system","admin");

const getAllContacts = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        const user = admin1.getStaffByID(userID);
        if(!user)
            throw new Error("invalid user id entered");
        
        const allContacts = user.getAllContacts();

        if(!allContacts)
            throw new Error("could not fetch all contacts");
        res.status(200).json(allContacts);      
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const getContactsByID = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            throw new error("invalid user id");

        const id = parseInt(req.params.id);
        if(isNaN(id))
            throw new Error("invalid contact id");
        const user = admin1.getStaffByID(userID);
        
        if(!user)
            throw new Error("user not found");

        const contact = user.getContactByID(id);
        if(!contact)
            throw new Error("contact not found");
        
        res.status(200).json(contact);      
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const newContact = (req,res) =>{
    try{
        const userID = parseInt(req.params.userID);
         
        if(isNaN(userID))
            throw new Error("invalid user id");

        const {firstName,lastName} = req.body;
        if(!firstName)
            throw new Error("invalid first name");
        if(!lastName)
            throw new Error("invalid last name");
        
        const user = admin1.getStaffByID(userID);
        if(!user)
            throw new Error("user not found");

        const newContact = user.createContact(firstName,lastName);

        if(!newContact)
            throw new Error("could not create contact");

        res.status(200).json(newContact);
    }
    catch(error){
        res.status(500).json({error :"something went wrong"});
        console.log(error);
    }
}

const updateContact = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            throw new Error("invalid user id");

        const id = parseInt(req.params.id);

        if(isNaN(id))
            throw new Error("invalid contact id");

        const {parameter,value} = req.body;

        if(!parameter)
            throw new Error("invalid parameter entered");
        if(!value)
            throw new Error("invalid value entered");
        
        const user = admin1.getStaffByID(userID);

        if(!user)
            throw new Error("user not found");

        const successfullyUpdated = user.updateContactByID(id,parameter,value);

        if(!successfullyUpdated)
            return res.status(200).json({error:"could not update contact"});
        
        res.status(200).json({message: `contact id ${id} has been successfully updated`});
    }
    catch(error){
        res.status(500).json({error :"something went wrong"});
        console.log(error);
    }
}

const deleteContact = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            throw new Error("invalid user id");

        const id = parseInt(req.params.id);
        if(isNaN(id))
            throw new Error("invalid contact id");
        
        const user = admin1.getStaffByID(userID);

        if(!user)
            throw new Error("user not found");

        const successfullyDeleted= user.deleteContactByID(id);

        if(!successfullyDeleted)
            throw new Error("could not delete contact");
        
        res.status(200).json({message: `contact id ${id} has been successfully deleted`});
    }
    catch(error){
        res.status(500).json({error :"something went wrong"});
        console.log(error);
    }
}


module.exports = {getAllContacts,getContactsByID,newContact,updateContact,deleteContact};

