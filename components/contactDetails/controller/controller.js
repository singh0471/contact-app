const User = require("../service/user.js");
const admin1 = User.newAdmin("System","Admin");



const getAllUsers = (req,res) => {
    try{
        const allUsers = User.getAllStaffs();
        res.status(200).json(allUsers);
    }
    catch(error){
        res.status(500).json({ error: "Something went wrong" });
        console.error(error);
    }
}

const getUserByID = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        
        if(isNaN(Number(id)))
            return res.status(400).json({error : "invalid user id entered"});
        
        const userByID = admin1.getStaffByID(id);
        
        if(!userByID)
            return res.status(400).json({error : "user not found"});

        res.status(200).json(userByID);

    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}

const createNewUser = (req,res) => {
    try{
        const {firstName, lastName} = req.body;

        if(!firstName)
            res.status(400).json({error : "invalid first name"});
        if(!lastName)
            res.status(400).json({error : "invalid last name"});

        const newUser = admin1.newStaff(firstName,lastName);
        if(!newUser)
            res.status(400).json({error:"could not create new user"});
        res.status(200).json(newUser);
    }
    catch(error){
        res.status(200).json({error : "something went wrong"});
        console.log(error);
    }
}



const updateUser = (req,res) =>{
    try{
        const id = req.params.id;
        const { parameter, value } = req.body;
        if(isNaN(id))
            return res.status(400).json({error : "invalid id entered"});
        if(typeof parameter !== "string")
            return res.status(400).json({error:"invalid parameter entered"});
        if(typeof value !== "string")
            return res.status(400).json({error:"invalid new value entered"});



        const isUpdated =  User.updateUserByID(id,parameter,value);

        if(!isUpdated)
            throw res.status(400).json({error : "could not update"});

        res.status(200).json({message : "user with id ${id} has been updated"})

    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}




const deleteUser = (req,res) => {
    try{
        const id = req.params.id;
        if(isNaN(id))
            return res.status(400).json({error : "invalid user id"});

        const deleteStatus = User.deleteUserByID(id);
        if(!deleteStatus)
            return res.status(400).json({error:"could not delete the user"});
        res.status(200).json({message : `user with id ${id} has been deleted successfully`});
        
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}



module.exports = {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser};