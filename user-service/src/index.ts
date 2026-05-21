import 'dotenv/config';
import express,{Request,Response} from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

//custom import 
import config from './config/server.config';
import corsMiddleware from "./middlewares/cors.middleware";
import errorHandler from './middlewares/error.middleware';
import logger from './config/logger.config';
import  reqLogger  from './middlewares/req.middleware';




//instance of express
const app = express();


//midllewares
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(corsMiddleware);
app.use(reqLogger);



//health check Route
app.get("/health",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"Health OK"
    })
})

//Routes
import authRouter from "./routes/auth.route";
app.use("/api/v1/auth",authRouter);





//error middleware
app.use(errorHandler);


//Route not found
app.use((req:Request, res:Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


//Run Server
const startServer = async ()=>{
    try{
   const server = app.listen(config.PORT,()=>{
    logger.info(`${config.SERVICE_NAME} is running on http://localhost:${config.PORT}`)
   })
    } catch(error){
        logger.error("Failed to Start Server",error);
        process.exit(1);

    }
}
startServer();





