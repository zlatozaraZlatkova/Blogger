export interface ITask {
  _id: string;
  sectionId: string;
  title: string;
  description: string;
  status: string;
  ownerId: string;

  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}
