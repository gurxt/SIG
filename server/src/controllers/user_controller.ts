import { RequestHandler, Response } from 'express';
import { IUser } from '#/util/types/user_types';
import User from "#/models/user_model";
import { generateToken } from '#/util/generateToken';
import emailToken from '#/models/emailToken_model';
import { sendVerificationMail } from '#/util/mail';
import { IVerifyEmail } from '#/util/types/verifyEmail_types';

export const createUser: RequestHandler = async (req: IUser, res: Response) => {
  const { username, email, password } = req.body;
  const user = await User.create({ email, password, username });

  const token = generateToken();

  sendVerificationMail(token, {
    userId: user._id.toString(),
    username,
    email
  });

  res.status(201).json({ user: { id: user._id, username, email }});
}

export const verifyEmail: RequestHandler = async (req: IVerifyEmail, res: Response) => {
  const { token, userId } = req.body;
  const verificationToken = await emailToken.findOne({ owner: userId });

  if (!verificationToken) return res.status(403).json({ error: '[ERROR] invalid token.'});

  const matched = await verificationToken.compareToken(token);

  if (!matched) return res.status(403).json({ error: "[ERROR] Token does not match."})

  await User.findByIdAndUpdate(userId, { verified: true })

  await emailToken.findByIdAndDelete(verificationToken._id);

  res.json({ message: "[INFO] your email is verified."});
}