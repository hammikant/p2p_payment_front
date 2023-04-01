export interface IMessage {
    _id: number;
    room: number;
    message: string;
}

export interface IRoom {
    _id: number;
    owner: string;
    messages: IMessage[]
}

export interface IUser {
    _id: string | undefined,
    userId: string;
    name: string;
    rooms: IRoom[];
    socketId: string | null;
}
