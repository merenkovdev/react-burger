import {  TItemShort } from './api';

export type TIngredient = {
	item: Omit<TItemShort, 'price'> & { price?: number },
	count?: number,
	onClickCard?: (id: string) => void,
	size?: string,
};
