import styles from './modal.module.css';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { HIDE_MODAL } from '../../services/actions/modal';

const modalRoot = document.getElementById('modals');

const ModalHeader = (props) => {
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

const Modal = (props) => {
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
		const onKeyPress = (e) => {
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

ModalHeader.propTypes = {
	closeModal: PropTypes.func.isRequired,
	children: PropTypes.node,
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	children: PropTypes.node,
	header: PropTypes.node,
	onClose: PropTypes.func,
};
