import { IPost } from "./post"

export interface IProfile {
  _id: string;
  ownerId: string;
  bio: string;
  githubUsername?: string;
  socialMedia?: ISocialMedia;
  createdAt: string;  
  updatedAt: string;  
  __v: number;
}

export interface ICreateProfileDto {
  bio: string;
  githubUsername?: string;
  socialMedia?: {
    linkedin?: string;
  };
}

export interface ISocialMedia {
  linkedin?: string;
}

export interface IProfileWithCreatedPosts {
  profile: IProfile;
  createdPosts: IPost[]
}

