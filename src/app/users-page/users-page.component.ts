import { Component, DestroyRef, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { BehaviorSubject, catchError, combineLatest, debounceTime, distinctUntilChanged, finalize, map, Observable, of, startWith, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderService } from '../services/loader.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserCreateComponent } from "../user-create/user-create.component";
import { LocalStorageService } from '../services/local-storage.service';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-users-page',
	standalone: true,
	imports: [AsyncPipe, UserCardComponent, UserCreateComponent, UsersFilterComponent],
	templateUrl: './users-page.component.html',
	styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

	private destroyRef: DestroyRef = inject(DestroyRef);
	private messageService: MessageService = inject(MessageService);
	private loaderService: LoaderService = inject(LoaderService);
	private localStorageService: LocalStorageService = inject(LocalStorageService);

	private userService: UserService = inject(UserService);
	users$: Observable<IUser[]> = this.userService.users$;

	searchControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
	private search$: Observable<string> = this.searchControl.valueChanges.pipe(
		startWith(''),
		debounceTime(200),
		distinctUntilChanged(),
		map((value: string) => value.trim().toLocaleLowerCase() ),
	);

	filteredUsers$: Observable<IUser[]> = combineLatest([this.users$, this.search$]).pipe(
		map(([users, search]) => {
			if (search) {
				return users.filter((user) => user.name.trim().toLowerCase().includes(search));
			}

			return users;
		})
	);

	constructor() {
		this.initUsers();
	}

	initUsers(): void {
		const usersFromStorage: IUser[] | null = this.localStorageService.getData<IUser[]>(this.localStorageService.USERS_KEY);
		if ( usersFromStorage?.length) {
			this.userService.setUsers(usersFromStorage);
			return;
		}

		this.userService.loadUsers()
			.pipe(
				tap((users: IUser[]) => {
					this.loaderService.showLoader();
					this.userService.setUsers(users);
					this.localStorageService.setData<IUser[]>(this.localStorageService.USERS_KEY, users)
				}),
				catchError((error: unknown) => {
					this.messageService.showError('Ошибка при загрузке пользователей');
					console.error(error);
					return of(error);
				}),
				finalize(() => this.loaderService.hideLoader()),
				takeUntilDestroyed(this.destroyRef)
			)
		.subscribe();
	}

	onDeleteUser(id: number): void {
		this.userService.deleteUser(id);
	}

	onCreateUser(user: IUser): void {
		this.userService.createUser(user);
	}

}
