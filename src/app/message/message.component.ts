import { Component, inject } from "@angular/core";
import { MessagesService } from "../services/messages.service";
import { MessageType } from "../enums/MessageType";
import { NgTemplateOutlet } from "@angular/common";

@Component({
	selector: 'app-message',
	imports: [NgTemplateOutlet],
	standalone: true,
	templateUrl: './message.component.html',
	styleUrl: './message.component.scss',
})
export class MessageComponent {

	messagesService: MessagesService = inject(MessagesService);
	messageType: typeof MessageType = MessageType;

	closeMessage(id: number): void {
		this.messagesService.closeMessage(id);
	}

}