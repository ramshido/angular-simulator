import { Component, inject } from '@angular/core';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-users-page',
  imports: [],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

	private usersService: MessagesService = inject(MessagesService);

	constructor() {

	}
	
}
