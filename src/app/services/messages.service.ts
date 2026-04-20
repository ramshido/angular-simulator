import { Injectable } from "@angular/core";
import { IMessage } from "../interfaces/IMessage";
import { MessageType } from "../enums/MessageType";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MessagesService {

	private messagesSubject$: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
	messages$: Observable<IMessage[]> = this.messagesSubject$.asObservable();

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
		this.messagesSubject$.next(
			this.messagesSubject$.value.filter((message: IMessage) => message.id !== id)
		);
	}

	private addMessage(type: MessageType, message: string): void {
		const newId: number = new Date().getTime();

		this.messagesSubject$.next([
			{
				type,
				message,
				id: newId,
			},
			...this.messagesSubject$.value,
		]);

		setTimeout(() => {
			if (this.messagesSubject$.value.length) {
				this.closeMessage(newId);
			}
		}, 5000);
	}

}