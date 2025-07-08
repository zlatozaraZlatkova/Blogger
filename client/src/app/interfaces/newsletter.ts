export interface INewsletter {
  subscriptionList: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}


export interface INewsletterResponse {
  message: string;
}