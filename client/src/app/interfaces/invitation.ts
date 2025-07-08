import { IUser } from './user';

export interface IInvitation {
  _id: string;
  email: string;
  userId: IUser;

  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
