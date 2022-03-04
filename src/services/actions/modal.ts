export const SHOW_MODAL: 'SHOW_MODAL' = 'SHOW_MODAL';
export const HIDE_MODAL: 'HIDE_MODAL' = 'HIDE_MODAL';

export type TShowModalAction = {
	readonly type: typeof SHOW_MODAL;
	readonly name: string;
};

export type THideModalAction = {
	readonly type: typeof HIDE_MODAL;
	readonly name: string;
};

export type TModalActions =	TShowModalAction | THideModalAction;
