import { Component } from '@angular/core';
import './training';
import './collection';
import { Color } from '../assets/enums/Color';
import { IКакой_нибудь_интерфейс } from '../assets/interfaces/IКакой-нибудь-интерфейс';

@Component({
	selector: 'app-root',
	imports: [],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	readonly companyNmae: string = 'рутимбет'.toUpperCase();

	readonly items: IКакой_нибудь_интерфейс[] = [
		{
			id: 1,
			title: 'Пивет',
			descr: 'lorem;sdeijv;jisp;dijgfp;oreij;rvj;ldfjigr'
		},
		{
			id: 2,
			title: 'Пивет',
			descr: 'lorem;sdeijv;jisp;dijgfp;oreij;rvj;ldfjigr'
		},
		{
			id: 3,
			title: 'Пивет',
			descr: 'lorem;sdeijv;jisp;dijgfp;oreij;rvj;ldfjigr'
		}
	];

	selectedItemId: number = 0;
	status: string = '';

	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();
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

	onSelectItem(id: number): void {
		this.selectedItemId = id;
	}

}

