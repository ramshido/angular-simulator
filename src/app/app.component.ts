import { Component } from '@angular/core';
import "./training";
import { EColor } from '../enums/Color';

function isColorMain(color: string): boolean {
	if (!color || typeof color !== 'string') {
		return false;
	}

	const mainColors: string[] = Object.values(EColor);
	return mainColors.includes(color);
}


@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	constructor() {
		this.setLastVisitDateToStorage();
		this.setVisitCountToStorage();
	}

	LAST_VISIT = 'lastVisit';
	VISIT_COUNT = 'visitCount'

	setLastVisitDateToStorage(): void {
		const date = new Date();

		localStorage.setItem(this.LAST_VISIT, JSON.stringify(date));
	}

	setVisitCountToStorage(): void {
		const storageData = localStorage.getItem(this.VISIT_COUNT);
		const visitCounter = storageData ? JSON.parse(storageData) : null;

		let counter: number = 1;
		
		if (!visitCounter || typeof Number(visitCounter) !== 'number') {
			localStorage.setItem(this.VISIT_COUNT, JSON.stringify(counter));
		} else {
			counter = visitCounter;
			counter++;
			localStorage.setItem(this.VISIT_COUNT, JSON.stringify(counter));
		}
	}

}
