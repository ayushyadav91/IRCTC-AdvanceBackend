import { NextFunction,Request,Response,RequestHandler } from "express";

// export const asyncHandler = (requestHandler:RequestHandler) => {
//   return (req:Request, res:Response, next:NextFunction) => {
//     Promise.resolve(requestHandler(req, res, next))
//       .catch((error) => next(error));
//   };
// };


type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (fn: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };