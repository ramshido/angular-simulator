import { Component, inject } from '@angular/core';

import { IAdvantage } from '../interfaces/IAdvantage';
import { IPopularDestination } from '../interfaces/IPopularDestination';
import { MessageService } from '../services/message.service';
import { MessageType } from '../enums/MessageType';
import { ITourBlog } from '../interfaces/ITourBlog';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-home-page',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './home-page.component.html',
	styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

	messageService: MessageService = inject(MessageService);
	messageType: typeof MessageType = MessageType;

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

	photoReportGallery: string[] = [
		'picture-on-background-balloons',
		'new-travel-items-on-map',
		'dubai-sail',
		'island-beach',
		'desert-canyon',
		'old-travel-items-on-map',
	];

}
