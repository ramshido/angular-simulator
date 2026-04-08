import { Injectable } from "@angular/core";
import { IMessage } from "../interfaces/IMessage";
import { MessageType } from "../enums/MessageType";

@Injectable({ providedIn: 'root' })
export class MessagesService {

	messages: IMessage[] = [];

	showWarn(message: string): void {
		this.addMessage(MessageType.WARN, message);
	}

	showError(message: string): void {
		this.addMessage(MessageType.ERROR, message);
	}

	showSuccess(message: string): void {
		this.addMessage(MessageType.SUCCESS, message);
	}

	showInfo(message: string): void {
		this.addMessage(MessageType.INFO, message);
	}

	closeMessage(id: number): void {
		this.messages = this.messages.filter((message: IMessage) => id !== message.id);
	}

	private addMessage(type: MessageType, message: string ): void {
    const newId: number = new Date().getTime();

		this.messages = [
			{
				type,
				message,
				id: newId,
			},
			...this.messages,
		];

		setTimeout(() => {
			if (this.messages.length) {
				this.closeMessage(newId);
			}
		}, 5000);
	}

}