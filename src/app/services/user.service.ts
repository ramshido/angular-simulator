import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
	private userApiService: UserApiService = inject(UserApiService);

	private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
	users$: Observable<IUser[]> = this.usersSubject.asObservable();

	setUsers(users: IUser[]): void {
		this.usersSubject.next(users);
	}

	getUsers(): IUser[] {
		return this.usersSubject.value;
	}

	loadUsers(): Observable<IUser[]> {
		return this.userApiService.getUsers();
	}

	deleteUser(id: number): void {
		this.usersSubject.next( 
			this.usersSubject.value.filter((user: IUser) => user.id !== id)
		);
	}

}
