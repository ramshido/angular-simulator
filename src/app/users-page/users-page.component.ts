import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoaderService } from '../services/loader.service';

@Component({
	selector: 'app-users-page',
	imports: [AsyncPipe],
	templateUrl: './users-page.component.html',
	styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

	private destroyRef: DestroyRef = inject(DestroyRef);
	private messageService = inject(MessageService);
	private loaderService: LoaderService = inject(LoaderService);

	private userService: UserService = inject(UserService);
	users$: Observable<IUser[]> = this.userService.users$;

	constructor() {
		this.userService.loadUsers()
			.pipe(
				tap((users: IUser[]) => {
					this.loaderService.showLoader()
					this.userService.setUsers(users)
				}),
				catchError((error: unknown) => {
					this.messageService.showError('Ошибка при загрузке пользователей');
					console.error(error);
					return of(error);
				}),
				finalize(() => this.loaderService.hideLoader()),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe()
	}

}
