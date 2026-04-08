import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { defer, from, Observable, of, share, shareReplay, Subject, Subscriber, tap } from 'rxjs';

import './training';
import './collection';
import { Color } from './enums/Color';
import { LocalStorageService } from './services/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from "./message/message.component";

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	selectedItemId: number = 0;
	status: string = '';
	isLoading: boolean = true;
	
	localStorageService: LocalStorageService = inject(LocalStorageService);
	
	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();

		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}

	private isMainColor(): boolean {
		const mainColors: string[] = [Color.RED, Color.BLUE, Color.GREEN];
		return mainColors.includes(Color.PURPLE);
	}

	private setLastVisitDate(): void {
		const LAST_VISIT_KEY: string = 'last-visit';

		const date: Date = new Date();
		this.localStorageService.setData<Date>(LAST_VISIT_KEY, date);
	}

	private setVisitCount(): void {
		const VISIT_COUNT_KEY: string = 'visit-count';

		const storageData: number | null = this.localStorageService.getData<number>(VISIT_COUNT_KEY);
		let visitCounter: number = storageData ? Number(storageData) : 0;
		visitCounter++;
		localStorage.setItem(VISIT_COUNT_KEY, JSON.stringify(visitCounter));
	}

}
