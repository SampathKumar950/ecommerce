import nodemailer from 'nodemailer';
import { Verification_Email_Template, Welcome_Email_Template } from './emailTemplate.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: 'lankasampath950@gmail.com',
    pass: 'befb bgur kxfp gqov',
  },
});

export const sendVerificationCode = async(email,verificationCode)=>{
    try{
        const info = await transporter.sendMail({
          from: '"Ecommerce" <lankasampath950@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "verify your Email", // Subject line
          text: "Hello world?", // plain text body
          html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // html body
        });
          console.log(info);
    }catch(error){
        console.log(error);
    }
};

// Send welcome email
export const welcomeEmailCode = async (email, name) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ecommerce" <lankasampath950@gmail.com>', // sender address
      to: email, // receiver address
      subject: 'Welcome to the Community', // Subject line
      text: `Welcome, ${name}!`, // plain text body
      html: Welcome_Email_Template.replace("{name}", name), // HTML body
    });
    console.log('Welcome email sent:', info);
  } catch (error) {
    console.log('Error sending welcome email:', error);
  }
};
