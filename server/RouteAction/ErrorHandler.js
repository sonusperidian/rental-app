
const ErrorHandler = (msg,code)=>{
    const error = new Error(msg);
    error.statusCode = code;
   
    return error;
}

module.exports = ErrorHandler;