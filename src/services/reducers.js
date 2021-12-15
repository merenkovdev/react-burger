import { MODAL_ORDER, MODAL_DETAILS } from '../utils/constants';

const modalReducer = (state, action) => {
	switch (action.type) {
		case MODAL_ORDER:
			return {
				modal: MODAL_ORDER,
			};

		case MODAL_DETAILS:
			return {
				modal: MODAL_DETAILS,
			}

		case 'hide':
			return {
				modal: '',
			}

		default:
			return state;
	}
};

const dataReducer = (state, action) => {
	switch (action.type) {
		case 'item-details':
			const itemDetails = state.data.find(item => item._id === action.payload);

			return {
				...state,
				itemDetails,
			};

		case 'start-fetch':
			return {
				...state,
				isLoading: true,
				hasError: false,
			};

		case 'done-fetch':
			return {
				...state,
				isLoading: false,
				hasError: false,
				data: action.payload,
			};


		case 'fail-fetch':
			return {
				...state,
				isLoading: false,
				hasError: true,
			};

		default:
			return state;
	}
};

export {
	modalReducer,
	dataReducer,
};
