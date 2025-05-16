import { IComment } from "./comment";
import { IUser } from "./user";

export interface IPost {
  _id: string;
  name: string;
  avatar?: string;
  postImageUrl: string;
  postCategory: string;
  postTags: string[];
  postTitle: string;
  postText: string;
  postLikes: IUser[];
  comments: IComment[];
  ownerId: string;
  
  createdAt?: Date; 
  updatedAt?: Date; 
  _v?: number;     
}