// import jwt from "jsonwebtoken";
// import config from "../../config/server.config";
// import crypto from "crypto";

// export const generateAccessToken = (userId:string)=>{
//     const payload = {
//      id: userId,
//     };
//     return jwt.sign(payload, config.JWT_ACCESS_SECRET,{
//         expiresIn: config.JWT_ACCESS_EXPIRES_IN,
//     });
// }

// export const generateRefreshToken = (userId:string)=>{
//     const payload = {
//         userId,
//         //jti = it is a unique identifier for the refresh token
//         jti: crypto.randomUUID(),
//     };
//     return jwt.sign(payload, config.JWT_REFRESH_SECRET,{
//         expiresIn: config.JWT_REFRESH_EXPIRES_IN,
//     });
// }

// export const verifyAccessToken = (accessToken:string)=>{
//     return jwt.verify(accessToken, config.JWT_ACCESS_SECRET);
// }
// export const verifyRefreshToken = (refreshToken:string)=>{
 
//     console.log("ye payload ka data hai", jwt.verify(refreshToken, config.JWT_REFRESH_SECRET));
//     return jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);

// }



import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/server.config";
import crypto from "crypto";

interface AccessTokenPayload extends JwtPayload {
  id: string;
}

interface RefreshTokenPayload extends JwtPayload {
  userId: string;
  jti: string;
}

console.log("GENERATE SECRET:", config.JWT_REFRESH_SECRET);

export const generateAccessToken = (userId: string) => {
  const payload = {
    id: userId,
  };

  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn: config.JWT_ACCESS_EXPIRES_IN,
  });
};

export const generateRefreshToken = (userId: string) => {
  const payload = {
    userId,
    jti: crypto.randomUUID(),
  };
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRES_IN,
  });
};


export const verifyAccessToken = (
  accessToken: string
): AccessTokenPayload => {
  return jwt.verify(
    accessToken,
    config.JWT_ACCESS_SECRET
  ) as AccessTokenPayload;
};

export const verifyRefreshToken = (refreshToken: string) => {
  const cleanToken = refreshToken.trim();

  const payload = jwt.verify(cleanToken, config.JWT_REFRESH_SECRET);

  return payload;
};