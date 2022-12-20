import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";

dotenv.config();

//db and authenticateUser
import connectDB from "./db/connect.js";
import "express-async-errors";

//routers
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";

//middleware
import {notFoundMiddleWare} from "./middleware/not_found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

if(process.env.NODE !== 'production')
{
    app.use(morgan('dev'));
}

app.use(express.json()); // this allows us to work with json objects throughout the entire backend
console.log("hello");

app.get('/api/v1',(req,res) =>
{
    res.json({msg:'Welcome!'});
});

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',jobRouter);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async() =>
{
    try
    {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,() =>
        {
            console .log(`Listening on port ${port}`);
        })
        console.log("Connected to database...");
    }
    catch(error)
    {
        console.log(error);
    }
}

start();