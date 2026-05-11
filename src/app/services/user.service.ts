import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { UserApiService } from './user-api.service';
import { IUser } from '../interfaces/IUser';
import { LocalStorageService } from './local-storage.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
	providedIn: 'root',
})
export class UserService {

	private userApiService: UserApiService = inject(UserApiService);
	private localStorageService: LocalStorageService = inject(LocalStorageService);
	private loaderService: LoaderService = inject(LoaderService);
	private messageService: MessageService = inject(MessageService);
	private destroyRef: DestroyRef = inject(DestroyRef);

	private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
	users$: Observable<IUser[]> = this.usersSubject.asObservable();

	setUsers(users: IUser[]): void {
		this.usersSubject.next(users);
		this.localStorageService.setData<IUser[]>(this.localStorageService.USERS_KEY, users);
	}

	getUsers(): IUser[] {
		return this.usersSubject.value;
	}

	loadUsers(): Observable<IUser[] | Error> {
		this.loaderService.showLoader();

		const usersFromStorage: IUser[] | null = this.localStorageService.getData<IUser[]>(this.localStorageService.USERS_KEY);
		if (usersFromStorage?.length) {
			return of(usersFromStorage).pipe( takeUntilDestroyed(this.destroyRef) );
		}

		return this.userApiService.getUsers()
			.pipe(
				tap((value: IUser[]) => {
					this.setUsers(value);
				}),
				catchError((error: Error) => {
					this.messageService.showError('Ошибка при загрузке пользователей');
					console.error(error);
					return of(error);
				}),
				finalize(() => this.loaderService.hideLoader()),
			)
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
