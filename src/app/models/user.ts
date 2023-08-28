import { EthereumAddress, ethereumAddress } from "../shared/domains";
import { Chat } from "./chat";
import { Notification } from './notification'
import { Task } from './task';

export interface User {
    name: string;
    fullName: string;
    username: string;
    image: string;
    email: string;
    walletAddress: EthereumAddress;
    createdTasks: Task[];
    purchasedTasks: Task[];
}

export function newUser(address: string, username: string, name?: string, fullname?: string, email?: string, image?: string) {
    return {
        walletAddress: ethereumAddress(address),
        username: username,
        email: email,
        name: name,
        fullName: fullname,
        image: image,
        createdTasks: [],
        purchasedTasks: []
    } as User;
}