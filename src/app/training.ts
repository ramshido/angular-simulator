interface IUser {
	id: number;
	name: string;
	lastName: string;
	age: number;
	email?: string;
}

interface IPlayer extends IUser {
	level: number;
	strength: string;
}

type UploadStatus = "loading" | "success" | "error";

let uploadingStatus: UploadStatus;

type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

let textFormat: TextFormat;

function sum(a: number, b: number): number {
	return a + b;
}

console.log(sum(5, 5));

const formatText = (text: string, format: TextFormat): string => {
	switch (format) {
		case "uppercase":
			return text.toUpperCase();
			break;
		case "lowercase":
			return text.toLowerCase();
			break;
		case "capitalize":
			return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
			break;
		default:
			return text;
	}
}

formatText("Salam", "uppercase");

const getTextWithoutSymbol: (text: string, symbol: string) => string = (text: string, symbol: string): string => {
	return text.replaceAll(symbol, "");
}

getTextWithoutSymbol("Vlad", "V");

const users: IUser[] = [
	{
		id: 1,
		name: 'Bip',
		age: 21,
		lastName: 'Bop'
	},
	{
		id: 2,
		name: 'Claus',
		age: 18,
		lastName: 'Santa'
	}
];

const filteredUsers: IUser[] = users.filter((user: IUser) => user.id !== 2);