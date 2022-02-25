export enum IngredientType {
	bun = 'bun',
	main = 'main',
	sauce = 'sauce',
};

export type TIngredientTypes = keyof typeof IngredientType;

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
	type: TIngredientTypes,
};

export type TItem = TItemShort & TCalories;

export enum OrderStatus {
	done = 'done',
	created = 'created',
	pending = 'pending',
};

export enum OrderStatusText {
	done = 'Выполнен',
	created = 'Создан',
	pending = 'Готовится',
};

export type TOrderStatus = keyof typeof OrderStatus;

export type TOrder = {
	_id: string;
	ingredients: string[];
	status: TOrderStatus;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
};

export type TResponseOrders = {
	orders: TOrder[],
	total: number,
	totalToday: number;
	success?: boolean;
};

export type TUser = {
	email: string;
	name: string;
};

export type TResponseBase = {
	success: boolean;
	message?: string;
};

export type TResponseIngredients = TResponseBase & {
	data: Array<TItem>;
};

export type TRequestCreateOrder = {
	ingredients: Array<string>;
};

export type TResponseCreateOrder = TResponseBase & {
	name: string;
	order: {
		number: number;
	};
};

export type TRequestForgot = {
	email: string;
};

export type TRequestReset = {
	password: string;
	token: string;
};

export type TRequestRegistration = TUser & {
	password: string;
};

export type TRequestLogin = {
	email: string;
	password: string;
};

export type TResponseTokens = TResponseBase & {
	refreshToken: string;
	accessToken: string;
};

export type TResponseUser = TResponseTokens & {
	user: TUser;
};

export type TRequestChange = {
	name?: string,
	email?: string;
	password?: string;
};

export type TResponseLogout = TResponseBase & {
	message: string;
};
