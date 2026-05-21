
import { Request, Response } from "express";
import { asyncHandler } from "../utils/helpers/asyncHandler";
import { BadRequestError ,UnauthorizedError } from "../utils/errors/app.error";
import { sendOTP, verifyingOTP ,userLogin, rotateRefreshTokenHandler} from "../services/auth.service";
import { generateDeviceFingerPrint } from "../utils/deviceFingerprint";
import config from "../config/server.config";
import { verify } from "node:crypto";



export const sendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("FirstName, LastName, Email, Password from body:", firstName, lastName, email, password);
  if (!firstName || !lastName || !email || !password) {
    throw new BadRequestError("All fields are mandatory");
  }
  //Todo: add password and confirm password DebugLoggerFunction
  const { otpSessionId } = await sendOTP({ firstName, lastName, email, password });
  console.log("OTPSessionId from sendOTP:", otpSessionId);
  res.cookie("otp_session", otpSessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: config.OTP_TTL * 100
  });
  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });
});

export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { otp } = req.body;

 const otpSessionId = req.cookies.otp_session || req.headers["otp-session"] || req.headers["otp_session"];
  if (!otp || !otpSessionId) {
    throw new BadRequestError("OTP OR OTPSession is missing");
  }
  const user = await verifyingOTP(otp, otpSessionId);
  return res.status(201).json({
    success: true,
    message: "User Account is created Successfully",
  })

});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("All fields are mandatory");
  }
  console.log("Email and Password from body:", email, password);

  const deviceID = generateDeviceFingerPrint(req);
  console.log("DeviceID from fingerprint:", deviceID);

  const { accessToken, refreshToken, loggedInUser } =
    await userLogin(email, password, deviceID);
    console.log("LoggedInUser from userLogin:", loggedInUser);

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: config.ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: config.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "User Logged In Successfully",
    loggedInUser,
  });
});


export const rotateRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;
  
  if (!refresh_token) {
    throw new UnauthorizedError("Unauthorized");
  }
  const deviceId = generateDeviceFingerPrint(req);
 
  const {newAccessToken,newRefreshToken} = await rotateRefreshTokenHandler(refresh_token,deviceId);
  console.log("NewAccessToken and NewRefreshToken from rotateRefreshTokenHandler:", newAccessToken,newRefreshToken);
  res.cookie("access_token", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: config.ACCESS_TOKEN_EXPIRES_IN_SECONDS * 1000,
  });
  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: config.REFRESH_TOKEN_EXPIRES_IN_SECONDS * 1000,
  });
  return res.status(200).json({
    success: true,
    message: "Access Token and Refresh Token Rotated Successfully",
  });
});

export const googleAuthVerifyGoogleIdToken = asyncHandler(async (req: Request, res: Response) => {
      const { idToken } = req.body;
      if(!idToken){
        throw new BadRequestError("Missing Google ID Token, INVALID_REQUEST");
      }
      const googleUser = await verifyGoogleIdToken(idToken);

});



