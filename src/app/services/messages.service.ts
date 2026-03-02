import { Injectable } from "@angular/core";
import { IMessage } from "../../assets/interfaces/IMessage";

@Injectable({ providedIn: 'root' })
export class MessagesService {

	messages: IMessage[] = [];

	addMessage(message: IMessage): void {
		this.messages = [
			...this.messages,
			message
		].reverse();
	}

	closeMessage(): void {
		if (!this.messages.length) {
			this.messages = this.messages.filter((message: IMessage, index: number) => index !== this.messages.length - 1);
		}
	}

}