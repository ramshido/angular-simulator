import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

import './training';
import './collection';
import { Color } from '../assets/enums/Color';
import { IAdvantageInfo } from '../assets/interfaces/Advantage';

@Component({
	selector: 'app-root',
	imports: [FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	readonly companyNmae: string = 'рутимбет'.toUpperCase();

	readonly advantagesInfo: IAdvantageInfo[] = [
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
	isLoading: boolean = true

	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();
		this.startDateTimer();
		this.breakPageLoading();
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

	selectItem(id: number): void {
		this.selectedItemId = id;
	}

	onSubmit(): void {
		console.log('Form submitted');
	}

	formatDate(date = new Date()): void {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = date.getHours(); // без ведущего нуля (как в примере)
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');

		this.dateToday = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
	}

	startDateTimer(): void {
		if (!this.isClicker) {
			setInterval(() => { this.formatDate(); }, 1000);
		}
	}

	toggleClicker(): void {
		this.isClicker = !this.isClicker;
		this.startDateTimer();
	}

	breakPageLoading(): void {
		setTimeout(() => {
			this.isLoading = !this.isLoading; 
		}, 2000)
	}
}

