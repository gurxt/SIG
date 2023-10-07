import { emailTemplate } from '#/mail/template';
import emailToken from '#/models/emailToken_model';
import path from 'path';
import nodemailer from 'nodemailer'

const generateMailTransporter = () => {
 const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  return transport
}

interface IProfile {
  username: string;
  email: string;
  userId: string;
}

export const sendVerificationMail = async (token: string, profile: IProfile) => {
  const transport = generateMailTransporter();

  const { username, email, userId } = profile;

  await emailToken.create({
    owner: userId,
    token
  });

  transport.sendMail({
    to: email,
    from: process.env.VERIFICATION_EMAIL,
    html: emailTemplate({ 
      title: token, 
      message: `${username}, here is your OTP token: `, 
      logo: "cid:logo"
    }),
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../mail/logo.png"),
        cid: "logo" 
      }
    ]
  });
}