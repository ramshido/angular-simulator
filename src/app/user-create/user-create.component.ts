import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { IUser } from '../interfaces/IUser';

interface IUserForm {
	id: FormControl<number>;
	name: FormControl<string>;
	username: FormControl<string>;
	email: FormControl<string>;
	address: FormGroup<{
		street: FormControl<string>;
		suite: FormControl<string>;
		city: FormControl<string>;
		zipcode: FormControl<number>;
		geo: FormGroup<{
			lat: FormControl<number>;
			lng: FormControl<number>;
		}>;
	}>;
	phone: FormControl<number>;
	website: FormControl<string>;
	company: FormGroup<{
		name: FormControl<string>;
		catchPhrase: FormControl<string>;
		bs: FormControl<string>;
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

	fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

	form: FormGroup<IUserForm> = this.fb.group({
		id: this.fb.control(Date.now()),
		name: this.fb.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
		username: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
		email: this.fb.control('', [Validators.required, Validators.email, Validators.maxLength(100)]),
		address: this.fb.group({
			street: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
			suite: this.fb.control('', [Validators.maxLength(50)]),
			city: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
			zipcode: this.fb.control(0, [Validators.required, Validators.min(5), Validators.maxLength(10)]),
			geo: this.fb.group({
				lat: this.fb.control(0, [Validators.required, Validators.min(10)]),
				lng: this.fb.control(0, [Validators.required, Validators.min(10)]),
			}),
		}),
		phone: this.fb.control(0),
		website: this.fb.control('', [Validators.maxLength(100)]),
		company: this.fb.group({
			name: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
			catchPhrase: this.fb.control('', [ Validators.maxLength(200)]),
			bs: this.fb.control('', [ Validators.maxLength(100)]),
		}),
	});

	onCreateUser(): void {
		this.createUser.emit(this.form.getRawValue());
		this.form.reset();
	}

}
