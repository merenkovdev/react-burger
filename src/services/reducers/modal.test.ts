import { modalReducer, modalInitialState } from './modal';
import * as ModalActions from '../actions/modal';

describe('modal reducer', () => {
	it('should return the initial state', () => {
		expect(modalReducer(undefined, {} as ModalActions.TModalActions))
			.toEqual(modalInitialState);
	});

	it('should handle show modal', () => {
		const activeModal = 'NAME_MODAL';

		expect(modalReducer(modalInitialState, ModalActions.showModalAction(activeModal)))
			.toEqual({
				...modalInitialState,
				active: activeModal,
			});
	});

	it('should handle hide modal', () => {
		const activeModal = 'NAME_MODAL';

		expect(modalReducer({
				...modalInitialState,
				active: activeModal,
			},
			ModalActions.hideModalAction()
		)).toEqual(modalInitialState);
	});
});
