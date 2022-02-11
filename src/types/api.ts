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

export type TUser = {
	email: string;
	name: string;
};

export type TResponseBase = {
	success: boolean;
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

export type TResponseUser = TResponseBase & {
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

export type TResponseTokens = TResponseBase & {
	refreshToken: string;
	accessToken: string;
};
