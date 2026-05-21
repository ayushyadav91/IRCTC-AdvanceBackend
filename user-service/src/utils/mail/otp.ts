

import {BadRequestError, TooManyRequest} from "../../utils/errors/app.error";
import config from "../../config/server.config";
import  otpGenerator from "otp-generator";
import bcrypt from "bcrypt"
import redis from "../../config/redis.config"



const RATE_MAX = config.OTP_RATE_MAX_PER_HOUR;
interface MetaData {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}

async function hmacforHash(otp:string){
      return await bcrypt.hash(otp, 10);
}

export const generateAndStoreOtp = async (meta:MetaData) => {
     //how many otp's you can send in an hour
     const rateKey = `otp:rate:!${meta.email}`
     const sendCount = parseInt(await redis.get(rateKey)|| '0',10)
     if(sendCount>=RATE_MAX){
        throw new TooManyRequest("TooManyRequest. Try again Later")
     }
     const otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        specialChars:false,
        lowerCaseAlphabets:false
     })
   
     const otpSessionId = crypto.randomUUID();
     const hashedOtp = await hmacforHash(otp)
      await redis.incr(rateKey);
      if (sendCount === 0) {
      await redis.expire(rateKey, 60 * 60);
  }
     await redis.set( `otp:session:${otpSessionId}`,JSON.stringify({
      hashedOtp,
        meta,
          }),
    "EX",1000
  );

  return {
    otp,
    otpSessionId,
  };
};


export const  verifyingUserOTP = async (otp:string, otpSessionId:string)=>{
         const rawData = await redis.get(`otp:session:${otpSessionId}`)
         console.log("RawData from redis:", rawData);
         if(!rawData) return null;
         const {hashedOtp, meta} = JSON.parse(rawData);
         
         const attemptsKey = `otp:attempts:${meta.email}`
         const attemptsCount = parseInt(await redis.get(attemptsKey)|| '0',10);
         if(attemptsCount>config.OTP_MAX_VERFIY_ATTEMPTS){
            throw new BadRequestError("Too Many Request")
         }
        const compare = await bcrypt.compare(otp,hashedOtp);
        if(compare){
            await redis.del(`otp:session:${otpSessionId}`,attemptsKey)
            await redis.del(`otp:rate:${meta.email}`)
            return meta;
        }else{
         await redis.incr(attemptsKey);
         await redis.expire(attemptsKey,config.OTP_TTL);
         return null
        }
}



      


