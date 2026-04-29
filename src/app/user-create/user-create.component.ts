import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

interface IUserForm {
	id: FormControl<number | null>;
	name: FormControl<string | null>;
	username: FormControl<string | null>;
	email: FormControl<string | null>;
	address: FormGroup<{
		street: FormControl<string | null>;
		suite: FormControl<string | null>;
		city: FormControl<string | null>;
		zipcode: FormControl<number | null>;
		geo: FormGroup<{
			lat: FormControl<number | null>;
			lng: FormControl<number | null>;
		}>;
	}>;
	phone: FormControl<number | null>;
	website: FormControl<string | null>;
	company: FormGroup<{
		name: FormControl<string | null>;
		catchPhrase: FormControl<string | null>;
		bs: FormControl<string | null>;
	}>;
}
@Component({
	selector: 'app-user-create',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './user-create.component.html',
	styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {

	@Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>;

	form: FormGroup<IUserForm> = new FormGroup({
		id: new FormControl(Date.now()),
		name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
		username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
		address: new FormGroup({
			street: new FormControl('', [Validators.required, Validators.maxLength(100)]),
			suite: new FormControl('', [Validators.maxLength(50)]),
			city: new FormControl(''),
			zipcode: new FormControl(0, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
			geo: new FormGroup({
				lat: new FormControl(0),
				lng: new FormControl(0),
			}),
		}),
		phone: new FormControl(),
		website: new FormControl(''),
		company: new FormGroup({
			name: new FormControl(''),
			catchPhrase: new FormControl(''),
			bs: new FormControl(''),
		}),
	});

	onCreateUser(): void {
		this.createUser.emit(this.form.getRawValue());
	}

}
