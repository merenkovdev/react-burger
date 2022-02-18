import { TItem, TItemShort } from './api';

export type TTopping = TItem & {
	uid: string,
};

export type TIngredient = {
	item: Omit<TItemShort, 'price'> & { price?: number },
	count?: number,
	onClickCard?: (id: string) => void,
	size?: string,
};

export type TTypeConstructorIngredient = 'top' | 'bottom';

export type TConstructorIngredient = {
	item: TTopping,
	onClose?: (item: TTopping) => void,
	type?: TTypeConstructorIngredient,
};

export type TDraggableConstructorIngredient = TConstructorIngredient & {
	index: number,
};

export type TSortIngredients = {
	[name: string]: TItem[],
};
