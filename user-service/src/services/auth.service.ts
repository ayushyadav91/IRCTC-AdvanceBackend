
import { BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError } from "../utils/errors/app.error";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.config";
import {generateAndStoreOtp, verifyingUserOTP} from "../utils/mail/otp"
import {sendEmail} from "../utils/mail/email"
import {OtpTemplate,AccountVerfiedTemplate} from "../templates/emailtemplate";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/helpers/authToken";
import jwt from "jsonwebtoken";
import redis from "../config/redis.config";
import config from "../config/server.config";

import {OAuth2Client} from "google-auth-library";
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);




interface SendOtpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const sendOTP = async ({firstName,lastName,email,password,}: SendOtpParams) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new ConflictError("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const meta = {
    firstName,
    lastName,
    email,
    hashedPassword,
  };
  const { otp, otpSessionId } = await generateAndStoreOtp(meta);
  await sendEmail(email, "OTP Verification", OtpTemplate(firstName,otp));
  return { otpSessionId };
};

export const verifyingOTP = async(otp:string, otpSessionId:string)=>{
  const meta = await verifyingUserOTP(otp,otpSessionId)
  if(meta===null){
    throw new BadRequestError("Invalid or expired OTP");
  }
   const user = await prisma.user.create({
    data:{
      firstName:meta.firstName,
      lastName:meta.lastName,
      email:meta.email,
      password:meta.hashedPassword,
      emailVerified:true
    }
   });
   await sendEmail(user.email,"Verified Account", AccountVerfiedTemplate(user.firstName));
   return user;
}
//-----------------------------------Login-------------------------------
export const userLogin = async (email:string,password:string,deviceID:string)=>{

  const user = await prisma.user.findUnique({
    where: { email },
  });
 
  if (!user) {
    throw new BadRequestError("User not found");
  }
  
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) {
    throw new UnauthorizedError("Invalid Credentials");
  }
  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);
  console.log(accessToken,"my access token");
  console.log(refreshToken,"my refresh token");
  //@ts-ignore
  const {jti} = jwt.decode(refreshToken);
  console.log(jti,"my jti");
  await redis.set(`refreshToken:${user.id}:${deviceID}`, jti, "EX", config.REFRESH_TOKEN_EXPIRES_IN_SECONDS*2);
  const {password:_password, ...safeUser} = user;

  await redis.set(`user:${user.id}`, JSON.stringify(safeUser), "EX", config.REDIS_USER_TTL);
  return { accessToken, refreshToken ,loggedInUser:safeUser};
};

//-----------------------------------Rotate Refresh Token-------------------------------
export const rotateRefreshTokenHandler = async (refreshToken:string,deviceId:string)=>{
  console.log("RefreshToken and DeviceId from rotateRefreshTokenHandler:", refreshToken,deviceId);
  const payload  = verifyRefreshToken(refreshToken) as any; //ye line data nh return kur rahi payload ka
  if(!payload){
  
  }
  //@ts-ignore
  const {userId, jti} = payload;
 
  const storedJti = await redis.get(`refreshToken:${userId}:${deviceId}`);
  if(!storedJti){
    throw new UnauthorizedError("Invalid or Expired Token");
  }
  
   if(storedJti!==jti){
    await redis.del(`refreshToken:${userId}:${deviceId}`);
    throw new ForbiddenError("Token resued, Please login again");
  }
  //@ts-ignore
  const newRefreshToken = generateRefreshToken(payload.id);
  //@ts-ignore
  const newAccessToken = generateAccessToken(payload.id)

  await redis.set(`refreshToken:${userId}:${deviceId}`, newRefreshToken, "EX", config.REFRESH_TOKEN_EXPIRES_IN_SECONDS);
  return {newAccessToken,newRefreshToken};

};

export const verifyGoogleIdToken = async (idToken:string)=>{
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID,
    // clientId: config.GOOGLE_CLIENT_ID,
    // clientSecret: config.GOOGLE_CLIENT_SECRET,
  });
  const payload = ticket.getPayload();
  //@ts-ignore
  if(!payload.sub || !payload.email){
    throw new UnauthorizedError("Invalid or Expired Token");
  }


   const googleUser = { provider:payload?.iss,
    providerId:payload?.sub,
    email:payload?.email,
    firstName:payload?.given_name,
    lastName:payload?.family_name,
    emailVerified:payload?.email_verified || false,
    }  
};

