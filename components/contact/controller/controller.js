const User = require("../../user/service/user.js");



const getAllContacts = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        const user = User.getUserByID(userID);
        if(!user)
            res.status(400).json({error:"user does not exist"});
        const allContacts = user.getAllContacts();
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
        
        const id = parseInt(req.params.id);
        if(isNaN(userID))
            res.status(400).json({error:"user does not exist"});
        if(isNaN(id))
            res.status(400).json({error:"contact does not exist"});
        const user = User.getUserByID(userID);
        if(!user)
            return res.status(200).json({error:"user not found"});

        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(200).json({error:"contact not found"});
        
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
            return res.status(400).json({error : "invalid user id"});
        const {firstName,lastName} = req.body;
        if(!firstName)
            return res.status(200).json({error:"invalid user name"});
        if(!lastName)
            return res.status(200).json({error:"invalid last name"});
        
        const user = User.getUserByID(userID);
        const newContact = user.createContact(firstName,lastName);
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
            return res.status(400).json({error : "invalid user id"});
        const id = parseInt(req.params.id);
        const {parameter,value} = req.body;
        if(!parameter)
            return res.status(200).json({error:"invalid user name"});
        if(!value)
            return res.status(200).json({error:"invalid last name"});
        
        const user = User.getUserByID(userID);
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
            return res.status(400).json({error : "invalid user id"});
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({error : "invalid contact id"});
        
        const user = User.getUserByID(userID);
        const successfullyDeleted= user.deleteContactByID(id);
        if(!successfullyDeleted)
            return res.status(200).json({error:"could not delete contact"});
        
        res.status(200).json({message: `contact id ${id} has been successfully deleted`});
    }
    catch(error){
        res.status(500).json({error :"something went wrong"});
        console.log(error);
    }
}


module.exports = {getAllContacts,getContactsByID,newContact,updateContact,deleteContact};

