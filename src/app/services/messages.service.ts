import { Injectable } from "@angular/core";
import { IMessage } from "../interfaces/IMessage";
import { MessageType } from "../enums/MessageType";

@Injectable({ providedIn: 'root' })
export class MessagesService {

	messages: IMessage[] = [];

	constructor() {
		setInterval(() => {
			if (this.messages.length) {
				this.messages = this.messages.filter((message: IMessage, index: number) => index !== this.messages.length - 1);
			}
		}, 5000);
	}

	addMessage(message: { type: MessageType, message: string }): void {
		this.messages = [
			{
				...message,
				id: new Date().getTime(),
			},
			...this.messages,
		];
	}

	closeMessage(id: number): void {
		this.messages = this.messages.filter((message: IMessage) => id !== message.id);
	}

}