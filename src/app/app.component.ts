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

	mainColors: string[] = [Color.RED, Color.BLUE, Color.GREEN];
	isColorMain: boolean = this.mainColors.includes(Color.PURPLE);

	LAST_VISIT: string = 'last-visit';
	VISIT_COUNT: string = 'visit-count';

	setLastVisitDate(): void {
		const date: Date = new Date();
		localStorage.setItem(this.LAST_VISIT, JSON.stringify(date));
	}

	setVisitCount(): void {
		const storageData: string | null = localStorage.getItem(this.VISIT_COUNT);
		let visitCounter: number = storageData ? parseInt(storageData, 10) : 0;
		visitCounter++;
		localStorage.setItem(this.VISIT_COUNT, JSON.stringify(visitCounter));
	}

}
