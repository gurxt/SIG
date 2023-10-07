import { RequestHandler, Response } from 'express';
import { IUser } from '#/util/types/user_types';
import User from "#/models/user_model";
import { generateToken } from '#/util/generateToken';
import emailToken from '#/models/emailToken_model';
import { sendVerificationMail } from '#/util/mail';

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