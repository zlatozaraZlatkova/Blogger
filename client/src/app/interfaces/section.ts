import { ITask } from './task';
import { IUser } from './user';

export interface ISection {
  _id: string;
  boardId: string;
  title: string;
  tasksList: ITask[];
  usersList: IUser[];
  ownerId: string;

  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
