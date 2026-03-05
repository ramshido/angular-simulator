import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import './training';
import './collection';
import { Color } from './enums/Color';
import { IAdvantage } from './interfaces/IAdvantage';
import { IPopularDestination } from './interfaces/IPopularDestination';
import { ITourBlog } from './interfaces/ITourBlog';
import { MessageType } from './enums/MessageType';
import { MessagesService } from './services/messages.service';
import { NgTemplateOutlet } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@Component({
	selector: 'app-root',
	imports: [FormsModule, NgTemplateOutlet],
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

	popularDestinations: IPopularDestination[] = [
		{
			id: 1,
			img: 'lake-near-mountains',
			title: 'Озеро возле гор',
			subtitle: 'романтическое приключение',
			price: 480,
			currency: '&#36;',
			reviewsEvaluation: 4.9,
		},
		{
			id: 2,
			img: 'mountains-at-starry-sky',
			title: 'Ночь в горах',
			subtitle: 'в компании друзей',
			price: 500,
			currency: '&#36;',
			reviewsEvaluation: 4.5,
		},
		{
			id: 3,
			img: 'yoga-on-mountain',
			title: 'Йога в горах',
			subtitle: 'для тех, кто забоится о себе',
			price: 230,
			currency: '&#36;',
			reviewsEvaluation: 5.0,
		}
	];

	toursBlog: ITourBlog[] = [
		{
			id: 1,
			img: 'italy-city',
			title: 'Красивая Италя, какая она в реальности?',
			descr: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
			date: '01/04/2023',
		},
		{
			id: 2,
			img: 'sky-from-airplane',
			title: 'Долой сомнения! Весь мир открыт для вас!',
			descr: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих условий активизации',
			date: '01/04/2023',
		},
		{
			id: 3,
			img: 'travel-alone',
			title: 'Как подготовиться к путешествию в одиночку? ',
			descr: 'Для современного мира базовый вектор развития предполагает.',
			date: '01/04/2023',
		},
		{
			id: 4,
			img: 'India',
			title: 'Индия ... летим?',
			descr: 'Для современного мира базовый.',
			date: '01/04/2023',
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
	messagesService: MessagesService = inject(MessagesService);
	localStorageService: LocalStorageService = inject(LocalStorageService);
	messageType: typeof MessageType = MessageType;

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

	addMessage(type: MessageType, message: string): void {
		this.messagesService.addMessage({
			type,
			message
		});
	}

	closeMessage(id : number): void {
		this.messagesService.closeMessage(id);
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

