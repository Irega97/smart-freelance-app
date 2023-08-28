import { Chat } from "./chat";
import { Notification } from './notification'
import { Task } from './task';

export interface User {
    _id: string;
    name: string;
    fullName: string;
    username: string;
    image: string;
    email: string;
    walletAddress: string | null;
    createdTasks: Task[];
    purchasedTasks: Task[];
}