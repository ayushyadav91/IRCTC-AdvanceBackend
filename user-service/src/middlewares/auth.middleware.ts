import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors/app.error";
import { verifyAccessToken } from "../utils/helpers/authToken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("Unauthorized");
    }
    const accessToken = authHeader.split(" ")[1];
    try{
        const payload = verifyAccessToken(accessToken);
        //@ts-ignore
        req.user = payload.id;
        next();

    }catch (error) {
    throw new UnauthorizedError("Invalid or Expired Token");
  }

};