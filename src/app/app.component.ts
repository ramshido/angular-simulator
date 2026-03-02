import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import './training';
import './collection';
import { Color } from '../assets/enums/Color';
import { IAdvantage } from '../assets/interfaces/IAdvantage';
import { IPopularDestination } from '../assets/interfaces/IPopularDestinations';
import { ITourBlog } from '../assets/interfaces/ITourBlog';
import { MessageType } from '../assets/enums/MessageType';
import { MessagesService } from './services/messages.service';
import { NgTemplateOutlet } from '@angular/common';

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

	get messageType(): typeof MessageType {
		return MessageType;
	}

	addMessage(type: MessageType, message: string): void {
		this.messagesService.addMessage({ 
			id: new Date().getTime(),
			type, 
			message 
		});
	}

	closeMessage(): void {
		this.messagesService.closeMessage();
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
