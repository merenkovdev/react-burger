import styles from './modal.module.css';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalContext from '../../services/modal-context';

const modalRoot = document.getElementById('modals');

const ModalHeader = (props) => {
	const {
		children,
		onClose,
	} = props;

	return (
		<div className={ styles.header }>
			{ children &&
				<h2 className={ cn(styles.title, 'text text_type_main-large') }>{ children }</h2>
			}
			<button onClick={ onClose } className={ cn(styles.close, 'btn-clear') }>
				<CloseIcon type="primary" />
			</button>
		</div>
	);
};

const Modal = (props) => {
	const { closeModal } = React.useContext(ModalContext);
	const {
		children,
		header,
		open
	} = props;

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
	}, [closeModal, open]);

	return (modalRoot &&
		ReactDOM.createPortal(
		<>
			<div className={ styles.dialog }>
				<ModalOverlay onClose={ closeModal } />
				<div className={ styles.modalContainer }>
					<div className={ cn(styles.modal, 'p-10') }>
						<ModalHeader onClose={ closeModal }>{ header }</ModalHeader>
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
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node,
};

Modal.propTypes = {
	open: PropTypes.bool.isRequired,
	children: PropTypes.node,
	header: PropTypes.node,
};