import { Component, inject } from "@angular/core";
import { MessagesService } from "../services/messages.service";
import { MessageType } from "../enums/MessageType";
import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Observable } from "rxjs";
import { IMessage } from "../interfaces/IMessage";

@Component({
	selector: 'app-message',
	imports: [NgTemplateOutlet, AsyncPipe],
	standalone: true,
	templateUrl: './message.component.html',
	styleUrl: './message.component.scss',
})
export class MessageComponent {

	messagesService: MessagesService = inject(MessagesService);

	messages$: Observable<IMessage[]> = this.messagesService.messages$;
	messageType: typeof MessageType = MessageType;

	closeMessage(id: number): void {
		this.messagesService.closeMessage(id);
	}

}