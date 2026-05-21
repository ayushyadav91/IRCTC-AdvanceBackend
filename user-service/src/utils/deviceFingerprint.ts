
import crypt from "crypto";

// export const generateDeviceFingerPrint = (userId:string)=>{
//     // const fingerPrint = crypt.createHash("sha256").update(userId).digest("hex");
//     // return fingerPrint;

//     const userAgenet = req.headers["user-agent"]||"";
//     // const ip = req.headers["x-forwarded-for"]||"";
//       const ip =
//     (req.headers["x-forwarded-for"] as string) ||
//     req.ip ||
//     "";
//     const accept = req.headers["accept"]||"";
//     const raw = `${userAgenet}|${ip}|${accept}`;


//     const fingerPrint = crypt.createHash("sha256").update(raw).digest("hex");
//     return fingerPrint;

// }

import { Request } from "express";
import crypto from "crypto";

export const generateDeviceFingerPrint = (req: Request) => {
  const userAgent = req.headers["user-agent"] || "";
  
  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.ip ||
    "";

  const accept = req.headers["accept"] || "";

  const raw = `${userAgent}|${ip}|${accept}`;

  const fingerPrint = crypto
    .createHash("sha256")
    .update(raw)
    .digest("hex");

  return fingerPrint;
};