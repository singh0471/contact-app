const User = require("../service/user.js");
const cookieParser = require("cookie-parser");




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
            throw new Error("invalid user id entered");
        const admin1 = User.allAdmins[0];
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

const createNewUser = async (req,res) => {
    try{
        const {firstName, lastName,username,password} = req.body;
        const admin1 = User.allAdmins[0];
        console.log(admin1);
        if(!firstName)
            throw new Error("invalid first name");
        if(!lastName)
            throw new Error("invalid last name");
        if(!username)
            throw new Error("invalid username");
        if(!password)
            throw new Error("invalid password");

        const newUser = await admin1.newStaff(firstName,lastName,username,password);

        if(!newUser)
            throw new Error("user could not be created");
        res.status(200).json(newUser);
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}   



const updateUser = (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const { parameter, value } = req.body;
        if(isNaN(id))
            throw new Error("invalid user id entered");
        if(typeof parameter !== "string")
            throw new Error("invalid parameter entered");
        if(typeof value !== "string")
            throw new Error("invalid value entered");


        const admin1 = User.allAdmins[0];
        const isUpdated =  admin1.updateStaffByID(id,parameter,value);

        if(!isUpdated)
            throw new Error("could not update the staff")

        res.status(200).json({message : `user with id ${id} has been updated`})

    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}




const deleteUser = (req,res) => {
    try{
        const id = parseInt(req.params.id);
        if(isNaN(id))
            throw new Error("invalid id entered");
        const admin1 = User.allAdmins[0];
        const deleteStatus = admin1.deleteStaffByID(id);
        if(!deleteStatus)
            throw new Error("user could not be deleted");
        res.status(200).json({message : `user with id ${id} has been deleted successfully`});
        
    }
    catch(error){
        res.status(500).json({error : "something went wrong"});
        console.log(error);
    }
}



module.exports = {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser};