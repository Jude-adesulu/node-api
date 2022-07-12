const sendSuccess = (res, data = {}, message, statusCode) => {
    const response = {
        success: true,
        message,
        data
    };
    return res.status(statusCode).json(response);
}

const sendErr = (res, message, statusCode) => {
    const response = {
        success: false,
        message,
        errorCode: statusCode
    };
    return res.status(statusCode).json(response);
}

module.exports = {
    sendSuccess,
    sendErr
}