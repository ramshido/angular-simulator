import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { BehaviorSubject, combineLatest, map, Observable, } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from "../user-create/user-create.component";
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
	selector: 'app-users-page',
	standalone: true,
	imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
	templateUrl: './users-page.component.html',
	styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

	private userService: UserService = inject(UserService);
	users$: Observable<IUser[]> = this.userService.users$;

	search$: BehaviorSubject<string> = new BehaviorSubject<string>('');

	filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.search$]).pipe(
		map(([users, search]) => {
			if (search) {
				return users.filter((user) => user.name.trim().toLowerCase().includes(search));
			}
			return users;
		})
	);

	constructor() {
		this.userService.loadUsers()
		.subscribe()
	}

	onDeleteUser(id: number): void {
		this.userService.deleteUser(id);
	}

	onCreateUser(user: IUser): void {
		this.userService.createUser(user);
	}

}
