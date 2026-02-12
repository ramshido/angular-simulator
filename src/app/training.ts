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

type TypeUploadStatus = "loading" | "success" | "error";

let uploadingStatus: TypeUploadStatus;

type TypeTextFormat = 'uppercase' | 'lowercase' | 'capitalize';

let textFormat: TypeTextFormat;

function getSum(a: number, b: number): number {
	return a + b;
}

console.log(getSum(5, 5));

const getFormatedText = (text: string, format: TypeTextFormat): string => {
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

getFormatedText("Salam", "uppercase");

const getRemovedSymbol: (text: string, symbol: string) => string = (text: string, symbol: string): string => {
	return text.replaceAll(symbol, "");
}

getRemovedSymbol("Vlad", "V");

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

