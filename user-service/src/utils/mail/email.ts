import nodemailer from "nodemailer";
import config from "../../config/server.config"



const transporter = nodemailer.createTransport({
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    secure: config.EMAIL_SECURE, // true for 465, false for other ports
    auth: {
        user: config.EMAIL_USER, // generated ethereal user
        pass: config.EMAIL_PASS, // generated ethereal password
    },
});

export const sendEmail = async(to:string,subject:string,html:any)=>{
    try{
     const info = await transporter.sendMail({
        from:config.EMAIL_FROM,
        to,
        subject,
        html,
     })
     console.log('Message sent: %s', info.messageId);
        return info;
    } catch(error){
        console.log("Error while seidng Eamil:,",error);
        throw error;
    }
}




