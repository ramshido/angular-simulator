import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concatMap, defer, exhaustMap, from, interval, mergeMap, Observable, of, share, shareReplay, Subject, Subscriber, switchMap, tap, timer } from 'rxjs';

import './training';
import './collection';
import { Color } from './enums/Color';
import { LocalStorageService } from './services/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MessageComponent } from "./message/message.component";
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './services/loader.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, FooterComponent, MessageComponent, LoaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {

	private localStorageService: LocalStorageService = inject(LocalStorageService);
	private loaderService: LoaderService = inject(LoaderService);

	selectedItemId: number = 0;
	status: string = '';
	
	constructor() {
		this.setLastVisitDate();
		this.setVisitCount();
		this.loaderService.showLoader();
	}

	sayHello(name: string): void {
		console.log(name);
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
