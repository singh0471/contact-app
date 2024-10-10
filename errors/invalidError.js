const ContactAppError = require("./baseError.js");
const { StatusCodes } = require("http-status-codes"); 

class InvalidError extends ContactAppError{
    constructor(specificMessage){
     super(400,specificMessage,"Invalid value","Invalid input request");
     
    }
 }
 
 module.exports = InvalidError;
