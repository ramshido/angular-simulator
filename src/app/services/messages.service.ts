import { Injectable } from "@angular/core";
import { IMessage } from "../interfaces/IMessage";

@Injectable({ providedIn: 'root' })
export class MessagesService {

	messages: IMessage[] = [];

	addMessage(message: IMessage): void {
		this.messages = [
			message,
			...this.messages,
		];
	}

	closeMessage(id?: number): void {
		if (id) {
			this.messages = this.messages.filter((message: IMessage) => id !== message.id);
			return;
		}
		this.messages = this.messages.filter((message: IMessage, index: number) => index !== this.messages.length - 1);
	}

}