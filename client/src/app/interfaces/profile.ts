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
  linkedin?: string;
}

export interface ISocialMedia {
  linkedin?: string;
}