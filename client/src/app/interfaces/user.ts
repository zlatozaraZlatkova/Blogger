import { IBoard } from "./board";
import { IInvitation } from "./invitation";
import { IPost } from "./post";
import { ISection } from "./section";
import { ITask } from "./task";
import { ITeam } from "./team";

export interface IUser {
  _id: string;  
  name: string;
  email: string;
  avatar?: string;
  createdBoards: IBoard[];
  createdSections: ISection[];
  createdTasks: ITask[];
  createdPosts: IPost[];
  likedPostList: string[];
  teams: ITeam[];
  sentInvitations: IInvitation[];
  receivedInvitations: IInvitation[];
  
  createdAt?: Date; 
  updatedAt?: Date; 
  _v?: number;  
}