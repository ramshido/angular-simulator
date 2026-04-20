import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

	private isLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoader$: Observable<boolean> = this.isLoaderSubject.asObservable();

	showLoader(): void {
		this.isLoaderSubject.next(true);

		setTimeout(() => {
			this.hideLoader();
		}, 2000);
	}

	hideLoader(): void {
		this.isLoaderSubject.next(false);
	}
  
}
