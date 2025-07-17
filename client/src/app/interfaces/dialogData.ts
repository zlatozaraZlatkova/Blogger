import { IProfile } from "./profile";

export interface IDialogData {
  mode: string;
  data?: IProfile;
  title: string;
}