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

	removeSpecificItem(ItemIndex: number): void {
		this.data = this.data.filter((el: T, index: number) => ItemIndex !== index);
	}

	swapItem(item: T, index: number): void {
		const newData: T[] = this.data;
		newData[index] = item;

		this.data = [...newData];
	}
}

const array1: string[] = ['1', '45', 'item', 'any', 'true', 'null'];
const array2: number[] = [45, 63, 10, 99];

const collection1 = new Collection<string>(array1);
const collection2 = new Collection<number>(array2);
