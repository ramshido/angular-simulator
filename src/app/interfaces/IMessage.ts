import { MessageType } from "../enums/MessageType";

export interface IMessage {
	id: number;
	type: MessageType;
	message: string;
}