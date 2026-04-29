import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
	standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

	@Input({ required: true }) user!: IUser;
	@Output() deleteUser: EventEmitter<number> = new EventEmitter(); 

	onDeleteCard(id: number): void {
		this.deleteUser.emit(id);
	}

}
