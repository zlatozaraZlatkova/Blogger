export interface INewsletter {
  subscriptionList: string[];
  createdAt?: Date;
  updatedAt?: Date;
  _v?: number;
}


export interface INewsletterResponse {
  message: string;
}