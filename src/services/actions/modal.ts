import {
	SHOW_MODAL,
	HIDE_MODAL,
} from '../constants/modal';

export type TShowModalAction = {
	readonly type: typeof SHOW_MODAL;
	readonly name: string;
};

export type THideModalAction = {
	readonly type: typeof HIDE_MODAL;
};

export const showModalAction = (name: string): TShowModalAction => ({
	type: SHOW_MODAL,
	name,
});

export const hideModalAction = (): THideModalAction => ({
	type: HIDE_MODAL,
});

export type TModalActions =	TShowModalAction | THideModalAction;
