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
	item: TTopping | TItem,
	onClose?: (item: TTopping) => void,
	type?: TTypeConstructorIngredient,
};

export type TDraggableConstructorIngredient = TConstructorIngredient & {
	index: number,
};

export type TAddedIngredients = {
	[name: string]: {
		type: string;
		count: number;
	}
};

export type TSortIngredients = {
	[name: string]: TItem[],
};

export const isTopping = (item: TTopping | TItem): item is TTopping => {
	return (item as TTopping).uid !== undefined;
};
