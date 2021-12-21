import {
	SHOW_MODAL,
	HIDE_MODAL,
} from '../actions/modal';

const modalInitialState = {
	active: '',
};

export const modalReducer = (state = modalInitialState, action) => {
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
