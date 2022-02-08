import styles from './modal.module.css';

import React, { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { HIDE_MODAL } from '../../services/actions/modal';

const modalRoot = document.getElementById('modals');

type TModal = {
	open?: boolean,
	header?: ReactNode,
	onClose?: () => void,
};

const ModalHeader: FC<{ closeModal: () => void }> = (props) => {
	const {
		children,
		closeModal,
	} = props;

	return (
		<div className={ styles.header }>
			{ children &&
				<h2 className={ cn(styles.title, 'text text_type_main-large') }>{ children }</h2>
			}
			<button onClick={ closeModal } className={ cn(styles.close, 'btn-clear') }>
				<CloseIcon type="primary" />
			</button>
		</div>
	);
};

const Modal: FC<TModal> = (props) => {
	const {
		children,
		header,
		open,
		onClose,
	} = props;

	const dispatch = useDispatch();
	const closeModal = React.useCallback(() => {
		dispatch({ type: HIDE_MODAL });
		if (typeof onClose === 'function') {
			onClose();
		}
	}, [ dispatch, onClose ]);

	React.useEffect(() => {
		const onKeyPress = (e: KeyboardEvent) => {
			if (open && e.key === 'Escape') {
				closeModal();
			}
		}

		document.addEventListener('keydown', onKeyPress);

		return () => {
			document.removeEventListener('keydown', onKeyPress);
		};
	}, [ open, closeModal ]);

	return (modalRoot &&
		ReactDOM.createPortal(
		<>
			<div className={ styles.dialog }>
				<ModalOverlay onClose={ closeModal } />
				<div className={ styles.modalContainer }>
					<div className={ cn(styles.modal, 'p-10') }>
						<ModalHeader closeModal={ closeModal }>{ header }</ModalHeader>
						{ children }
					</div>
				</div>
			</div>
		</>,
		modalRoot
	));
}

export default Modal;
