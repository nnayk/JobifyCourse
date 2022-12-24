import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes';

class CustomAPIError extends Error
{
    constructor(message,code)
    {
        super(message);
        this.statusCode = code;
    }
}
const register = async (req,res,next) =>
{
    // old way
    // try
    // {
    //     const userObj = await User.create(req.body);
    //     res.status(201).send({userObj});
    // }   
    // catch(error)
    // {
    //     next(error); // you can do this instead of passing in a hardcoded message for each controller. this will automatically call the error middleware handler.
    // } 

    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        throw new CustomAPIError("Please provide all values.",StatusCodes.BAD_REQUEST);
    }

    const userAlreadyExists = await User.findOne({email: email }); // check for already used email
    if(userAlreadyExists)
    {
        console.log(userAlreadyExists);
        throw new CustomAPIError("email already in use",StatusCodes.BAD_REQUEST);
    }

    const userObj = await User.create({name,email,password});
    const token = userObj.createJWT();
    res.status(StatusCodes.CREATED).json({user:{email:userObj.email,name:userObj.name,lastName:userObj.lastName,location:userObj.location},token:token,location:userObj.location});
    
}

const login = async (req,res) =>
{
    const {email,password} = req.body;

    if(!email || !password)
    {
        throw new CustomAPIError("Please provide all values",StatusCodes.BAD_REQUEST);
    }

    const user = await User.findOne({email}).select("+password");

    if(!user)
    {
        throw new CustomAPIError("Invalid credentials",StatusCodes.UNAUTHORIZED);
    }

    const isPasswordCorrect = await user.comparePassword(password);
    console.log("YELAY",isPasswordCorrect);

    if(!isPasswordCorrect)
    {
        throw new CustomAPIError("Invalid credentials",StatusCodes.UNAUTHORIZED);
    }

    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user,token,location:user.location});
}

const updateUser = async (req,res) =>
{
    res.send("updated user...");
}

export {register,login,updateUser,CustomAPIError};