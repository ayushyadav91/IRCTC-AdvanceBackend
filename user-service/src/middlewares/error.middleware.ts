import { Request, Response, NextFunction } from "express";
import {AppError} from "../utils/errors/app.error";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Custom App Error
  console.log("Error in ErrorHandler:",err);
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    
    });
  }
 
  // Unknown Error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",

  });
};

export default errorHandler;