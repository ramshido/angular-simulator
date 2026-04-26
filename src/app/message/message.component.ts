import { Component, inject } from "@angular/core";
import { MessageService } from "../services/message.service";
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

	messageService: MessageService = inject(MessageService);

	messages$: Observable<IMessage[]> = this.messageService.messages$;
	messageType: typeof MessageType = MessageType;

	closeMessage(id: number): void {
		this.messageService.closeMessage(id);
	}

}