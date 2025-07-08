export interface IComment {
    _id: string; 
    text: string;
    name: string;
    avatar?: string;
    user: string;
    
    createdAt?: Date;
    updatedAt?: Date;

}