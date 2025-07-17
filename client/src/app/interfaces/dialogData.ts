import { IProfile } from "./profile";

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
}