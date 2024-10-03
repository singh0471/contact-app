const User = require("../../user/service/user.js");

getAllContactDetails = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            return res.status(400).json({error : "invalid user id"});
        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            return res.status(400).json({error : "invalid contact id"});

        const user = User.getUserByID(userID);
        if(!user)
            return res.status(400).json({error:"user not found"});
        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(400).json({error:"contact not found"});

        const allContactDetails = contact.getAllContactDetails();

        if(!allContactDetails)
            return res.status(400).json({error:"contact details not found"});
        res.status(200).json(allContactDetails);
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

getContactDetailsByID = (req,res) => {
    try{
        const userID = parseInt(req.params.userID);
        if(isNaN(userID))
            return res.status(400).json({error : "invalid user id"});
        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            return res.status(400).json({error : "invalid contact id"});
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({error : "invalid contact details id"});

        const user = User.getUserByID(userID);
        if(!user)
            return res.status(400).json({error:"user not found"});
        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(400).json({error:"contact not found"});

        const contactDetail = user.getContactDetailsByID(contactID,id);
        if(!contactDetail)
            return res.status(400).json({error:"contact details not found"});

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
            return res.status(400).json({error : "invalid user id"});
        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            return res.status(400).json({error : "invalid contact id"});
        

        const user = User.getUserByID(userID);
        if(!user)
            return res.status(400).json({error:"user not found"});
        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(400).json({error:"contact not found"});

        const {type,value} = req.body;
        if(!type)
            return res.status(400).json({error:"contact detail type invalid"});
        if(!value)
            return res.status(400).json({error:"contact detail type invalid"});
        const contactDetails = User.addContactDetail(contactID,type,value);

        if(!contactDetails)
            return res.status(400).json({error:"contact details could not be created"});

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
            return res.status(400).json({error : "invalid user id"});
        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            return res.status(400).json({error : "invalid contact id"});
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({error : "invalid contact details id"});

        const {property,value} = req.body;

        if(!property)
            return res.status(400).json({error:"invalid property"});
        if(!value)
            return res.status(400).json({error:"invalid value"});

        const user = User.getUserByID(userID);
        if(!user)
            return res.status(400).json({error:"user not found"});
        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(400).json({error:"contact not found"});

        const contactDetail = user.updateContactDetailByID(contactID,id,property,value);
        if(!contactDetail)
            return res.status(400).json({error:"contact details not found"});
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
            return res.status(400).json({error : "invalid user id"});
        const contactID = parseInt(req.params.contactID);
        if(isNaN(contactID))
            return res.status(400).json({error : "invalid contact id"});
        const id = parseInt(req.params.id);
        if(isNaN(id))
            return res.status(400).json({error : "invalid contact details id"});

        const user = User.getUserByID(userID);
        if(!user)
            return res.status(400).json({error:"user not found"});
        const contact = user.getContactByID(id);
        if(!contact)
            return res.status(400).json({error:"contact not found"});

        const contactDetail = user.deleteContactDetailByID(contactID,id);
        if(!contactDetail)
            return res.status(400).json({error:"contact details not found"});

        res.status(200).json({message : `contact detail with id ${id} has been deleted successfully`});
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

module.exports = {getAllContactDetails,getContactDetailsByID,newContactDetails,updateContactDetail,deleteContactDetails};