import { Request } from 'express';

export interface IUser extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  }
}