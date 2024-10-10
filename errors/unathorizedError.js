const ContactAppError = require("./baseError.js");
const {StatusCodes} = require("http-status-codes");

class UnauthorizedError extends ContactAppError {
    constructor(specificMessage){
        super(StatusCodes.UNAUTHORIZED,specificMessage,"UNAUTHORIZED","Unauthorized request");

    }
}

module.exports = UnauthorizedError;