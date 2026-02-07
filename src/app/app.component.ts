import { Component } from '@angular/core';
import './training';
import './collection';
import { Color } from '../enums/Color';

function isColorMain(color: Color): boolean {
	if (!color || typeof color !== 'string') {
		return false;
	}

	const mainColors: string[] = [Color.RED, Color.BLUE, Color.GREEN];
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

	LAST_VISIT: string = 'lastVisit';
	VISIT_COUNT: string = 'visitCount';

	setLastVisitDateToStorage(): void {
		const date: Date = new Date();
		localStorage.setItem(this.LAST_VISIT, JSON.stringify(date));
	}

	setVisitCountToStorage(): void {
		const storageData: string | null = localStorage.getItem(this.VISIT_COUNT);
		let visitCounter: number = storageData ? parseInt(storageData, 10) : 0;
		visitCounter++;
		localStorage.setItem(this.VISIT_COUNT, JSON.stringify(visitCounter));
	}

	showDatePicker(event: any): void {
		event.target.showPicker();
	}
}
