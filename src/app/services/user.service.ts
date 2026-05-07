import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private userApiService: UserApiService = inject(UserApiService);
	private localStorageService: LocalStorageService = inject(LocalStorageService);

	private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
	users$: Observable<IUser[]> = this.usersSubject.asObservable();

	setUsers(users: IUser[]): void {
		this.usersSubject.next(users);
		this.localStorageService.setData<IUser[]>(this.localStorageService.USERS_KEY, users);
	}

	getUsers(): IUser[] {
		return this.usersSubject.value;
	}

	loadUsers(): Observable<IUser[]> {
		return this.userApiService.getUsers();
	}

	deleteUser(id: number): void {
		const filteredUsers: IUser[] = this.getUsers().filter((user: IUser) => user.id !== id);
		this.setUsers(filteredUsers);

	}

	createUser(user: IUser): void {
		const newUsers: IUser[] = [...this.getUsers(), user];
		this.setUsers(newUsers);
	}

}
