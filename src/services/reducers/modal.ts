import {
	TModalActions,
} from '../actions/modal';

import {
	SHOW_MODAL,
	HIDE_MODAL,
} from '../constants/modal';

import type { TModalState } from '../../types/redux';

export const modalInitialState: TModalState = {
	active: '',
};

export const modalReducer = (
	state = modalInitialState,
	action: TModalActions
): TModalState => {
	switch (action.type) {
		case SHOW_MODAL:
			return {
				...state,
				active: action.name,
			};

		case HIDE_MODAL:
			return {
				...state,
				active: '',
			};

		default:
			return state;
	}
};
