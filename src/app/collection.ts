export class Collection<T> {

	data: T[] = [];

	constructor(data: T[]) {
		this.data = data;
	}

	getCollection(): T[] {
		return this.data;
	}

	getSpecificItem(index: number): T {
		return this.data[index];
	}

	clearCollection(): void {
		this.data = [];
	}

	removeSpecificItem(itemIndex: number): void {
		this.data = this.data.filter((el: T, index: number) => itemIndex !== index);
	}

	swapItem(item: T, index: number): void {
		const newData: T[] = this.data;
		newData[index] = item;

		this.data = [...newData];
	}

}

const anyStringArray: string[] = ['1', '45', 'item', 'any', 'true', 'null'];
const numbers: number[] = [45, 63, 10, 99];

const anyStringCollection: Collection<string> = new Collection<string>(anyStringArray);
const numberCollection: Collection<number> = new Collection<number>(numbers);
