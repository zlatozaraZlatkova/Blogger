import { IUser } from './user';

export interface ITeam {
  _id: string;
  name: string;
  membersList: IUser[];
  ownerId: IUser;

  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
