import { IProfile } from "./profile";
import { IUser } from "./user";

export interface IDialogData {
  mode: string;
  data?: IProfile;
  title: string;
}

export interface IConfirmDialogData {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  emailInputTag?: boolean;
}


export interface IListDialogData {
  title: string;
  followerList: IUser[];
}