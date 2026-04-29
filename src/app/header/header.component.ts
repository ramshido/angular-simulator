import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
	standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

		@Input() name!: string;
		@Output() clickMe: EventEmitter<string> = new EventEmitter<string>();

	companyNmae: string = 'рутимбет';
	isClicker: boolean = false;
	counter: number = 1;
	dateToday: string = '';
	tourLocation: string = '';
	participants: string = '';

	navigations: INavigation[] = [
		{ title: 'Main', url: '' },
		{ title: 'Users', url: 'users' },
	];

	constructor() {
		setInterval(() => {
			this.dateToday = new Date().toLocaleString();
		}, 1000);

		this.clickMe.emit('hello work')
	}

	onSubmit(): void {
		alert('Form submitted');
	}

}
