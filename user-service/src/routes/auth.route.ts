import express from "express";
const authRouter = express();

import {login, sendOtp,verifyOTP,rotateRefreshToken} from "../controllers/auth.controller";

authRouter.post("/send-otp",sendOtp);
authRouter.post("/verify-otp",verifyOTP);
authRouter.post("/login",login);
authRouter.post("/rotate-refresh-token",rotateRefreshToken);




export default authRouter;
