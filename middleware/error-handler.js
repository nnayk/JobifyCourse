import {StatusCodes} from 'http-status-codes';

function errorHandlerMiddleware(err,req,res,next)
{
    console.log(`Error = ${err}`);
    const defaultError = 
    {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong.'
    }
    if(err.name === 'ValidationError')
    {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // defaultError.msg = err.message;
        defaultError.msg = Object.values(err.errors).map((item) => item.message).join(',');
    }
    if(err.code && err.code === 11000)
    {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(err.keyValue)} has to be unique.`
    }
    // res.status(defaultError.statusCode).json({msg: err})
    res.status(defaultError.statusCode).json({msg: defaultError.msg});
}

export default errorHandlerMiddleware;
let x = 3;
console.log(x);