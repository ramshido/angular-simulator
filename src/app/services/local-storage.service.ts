import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  getData<T>(key: string): T | null {
		const data: string | null = localStorage.getItem(key);
		return data ? JSON.parse(data) : null;
	}

	setData<T>(key: string, data: T): void {
		localStorage.setItem(key, JSON.stringify(data));
	}

	removeData(key: string): void {
		localStorage.removeItem(key);
	}

	clearStorage(): void {
		localStorage.clear();
	}

}
