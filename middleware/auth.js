import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../controllers/authController";
const auth = async (req,res,next) =>
{
    const authHeader = req.headers.authorization; 
    console.log(authHeader);
    if(!authHeader)
    {
        throw new CustomAPIError("Authentication failed",StatusCodes.UNAUTHORIZED);
    }
    next();
}

export default auth;