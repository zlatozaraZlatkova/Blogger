import { ISection } from './section';

export interface IBoard {
  _id: string;
  title: string;
  sectionList: ISection[];
  ownerId: string;

  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}
