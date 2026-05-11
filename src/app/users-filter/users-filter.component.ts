import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {
	
	@Output() submitName: EventEmitter<string> = new EventEmitter<string>();

	private destroyRef: DestroyRef = inject(DestroyRef);

  nameControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });

	constructor() {
		this.nameControl.valueChanges
			.pipe(
				startWith(''),
				debounceTime(200),
				distinctUntilChanged(),
				tap((value: string) => {
					this.submit(value.trim().toLowerCase());
				}),
				takeUntilDestroyed(this.destroyRef)
			)
		.subscribe();
		
	}

	submit(value: string): void {
		this.submitName.emit(value);
	}

}
