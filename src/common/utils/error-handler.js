class ErrorHandler extends Error{
    constructor(errMessage, statusCode){
        super(errMessage);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

const throwErr = (errMessage, statusCode) => {
    throw new ErrorHandler(errMessage, statusCode);
}

module.exports = {throwErr};