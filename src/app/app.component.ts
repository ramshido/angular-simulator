import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

import './training';
import './collection';
import { Color } from '../assets/enums/Color';
import { IAdvantage } from '../assets/interfaces/IAdvantage';

@Component({
	selector: 'app-root',
	imports: [FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	companyNmae: string = 'рутимбет';

	advantagesInfo: IAdvantage[] = [
		{
			id: 1,
			icon: 'people-group-green-icon',
			title: 'Опытный гид',
			descr: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
		},
		{
			id: 2,
			icon: 'shield-blue-icon',
			title: 'Безопасный поход',
			descr: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
		},
		{
			id: 3,
			icon: 'bookmark-yellow-icon',
			title: 'Лояльные цены',
			descr: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
		}
	];

	selectedItemId: number = 0;
	status: string = '';
	tourLocation: string = '';
	participants: string = '';
	isClicker: boolean = false;
	counter: number = 1;
	dateToday: string = '';
	isLoading: boolean = true;

	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();

		setTimeout(() => {
			this.isLoading = false;
		}, 2000);

		setInterval(() => {
			this.dateToday = new Date().toLocaleString();
		}, 1000);
	}

	onSubmit(): void {
		alert('Form submitted');
	}

	private isMainColor(): boolean {
		const mainColors: string[] = [Color.RED, Color.BLUE, Color.GREEN];
		return mainColors.includes(Color.PURPLE);
	}

	private setLastVisitDate(): void {
		const LAST_VISIT_KEY: string = 'last-visit';

		const date: Date = new Date();
		localStorage.setItem(LAST_VISIT_KEY, JSON.stringify(date));
	}

	private setVisitCount(): void {
		const VISIT_COUNT_KEY: string = 'visit-count';

		const storageData: string | null = localStorage.getItem(VISIT_COUNT_KEY);
		let visitCounter: number = storageData ? parseInt(storageData, 10) : 0;
		visitCounter++;
		localStorage.setItem(VISIT_COUNT_KEY, JSON.stringify(visitCounter));
	}

}

