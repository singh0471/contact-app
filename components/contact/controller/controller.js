const User = require("../../user/service/user.js");

const admin1 = User.newAdmin("system","admin");

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

        const contact = user.getContactsByID(id);
        if(!contact)
            return res.status(200).json({error:"contact not found"});
        
        res.status(200).json(contact);      
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}




module.exports = {getAllContacts,getContactsByID};

