import { IComment } from "./comment";
import { IPagination } from "./pagination";
import { IUser } from "./user";

export interface IPost {
  success: any;
  _id: string;
  name: string;
  avatar?: string;
  postImageUrl: string;
  postCategory: string;
  postTags: string[];
  postTitle: string;
  postText: string;
  postLikes: IUser[];
  comments?: IComment[];
  ownerId: string;
  
  createdAt?: Date; 
  updatedAt?: Date; 
  _v?: number;     
}


export interface IPostsResponse {
  success: boolean;
  data: {
    items: IPost[];
    pagination: IPagination;
  };
}

