const jwt = require("jsonwebtoken");
const Logger = require("../util/Logger.js");
const NotFoundError = require("../errors/notFoundError.js");
const UnathorizedError = require("../errors/unathorizedError.js");


const secretKey = "gvbxgjnkoiewfhc";


class Payload{
    constructor(id,isAdmin){
        this.id = id;
        this.isAdmin = isAdmin;
    }

    static newPayload(id,isAdmin){
        try{
            return new Payload(id,isAdmin);
        }
        catch(error){
            Logger.error(error);
        }
    }

    signPayload(){
        try{
            return `Bearer ${jwt.sign({id : this.id, isAdmin : this.isAdmin},secretKey,{expiresIn: '10hr'})}`;       
        }
        catch(error){
            Logger.error(error);
        }
    }

    static verifyToken(token){
        let payload = jwt.verify(token,secretKey);
        return payload;
    }
}

const verifyAdmin = (req,res,next) => {
    try{
        Logger.info("verify admin");

        if(!req.cookies["auth"] && !req.headers["auth"])
            throw new UnathorizedError("cookie not found");

        const token = req.cookies["auth"].split(" ")[2];

        const payload = Payload.verifyToken(token);

        if(!payload.isAdmin)
            throw new UnathorizedError("admin verification failed");

        Logger.info("admin verified");
        next();
    }   
    catch(error){
        Logger.error(error);
    }
}


const verifyStaff = (req,res,next) => {
    try{
        Logger.info("verify staff");

        if(!req.cookies["auth"] && !req.headers["auth"])
            throw new UnathorizedError("cookie not found");

        const token = req.cookies["auth"].split(" ")[2];

        const payload = Payload.verifyToken(token);

        if(payload.isAdmin)
            throw new UnathorizedError("staff verification failed");


        const { userID } = req.params;
        if (userID != payload.id) {
            throw new UnathorizedError("You are not authorized to access this account");
        }
        

        Logger.info("staff verified");
        next();
    }   
    catch(error){
        Logger.error(error);
    }
}

module.exports = {Payload,verifyAdmin,verifyStaff};


