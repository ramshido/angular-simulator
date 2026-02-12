import { Component } from '@angular/core';
import './training';
import './collection';
import { Color } from '../enums/Color';

@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();
	}

	isMainColor(): boolean {
		const mainColors: string[] = [Color.RED, Color.BLUE, Color.GREEN];
		return mainColors.includes(Color.PURPLE);
	}

	setLastVisitDate(): void {
		const LAST_VISIT_KEY: string = 'last-visit';

		const date: Date = new Date();
		localStorage.setItem(LAST_VISIT_KEY, JSON.stringify(date));
	}

	setVisitCount(): void {
		const VISIT_COUNT_KEY: string = 'visit-count';

		const storageData: string | null = localStorage.getItem(VISIT_COUNT_KEY);
		let visitCounter: number = storageData ? parseInt(storageData, 10) : 0;
		visitCounter++;
		localStorage.setItem(VISIT_COUNT_KEY, JSON.stringify(visitCounter));
	}

}
