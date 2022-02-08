export type TCalories = {
	fat: number,
	calories: number,
	proteins: number,
	carbohydrates: number,
};

export type TItemShort = {
	_id: string,
	name: string,
	price: number,
	image: string,
	image_large: string,
	type: string,
};

export type TItem = TItemShort & TCalories;


