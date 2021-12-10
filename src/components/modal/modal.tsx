import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import cn from 'classnames';

const toogleBodyClass = (toggle: boolean) => {
	document.body.classList.toggle('has-modal', toggle);
}

interface IModalHeader {
	children: React.ReactNode,
	onClose: () => void,
}

const ModalHeader = (props: IModalHeader) => {
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

const Modal = (props: {
	children: React.ReactNode,
	onClose: () => void,
	open: boolean,
	header?: React.ReactNode,
	close?: boolean,
}) => {
	const {
		children,
		header,
		onClose,
		open
	} = props;
	const modalRoot = document.getElementById('modals');

	React.useEffect(() => {
		toogleBodyClass(open);

		return () => {
			toogleBodyClass(false);
		};
	}, [open]);

	React.useEffect(() => {
		const onKeyPress = (e: { key: string }) => {
			if (open && e.key === 'Escape') {
				onClose();
			}
		}

		document.addEventListener('keydown', onKeyPress);

		return () => {
			document.removeEventListener('keydown', onKeyPress);
		};
	}, [onClose, open]);

	return (modalRoot &&
		ReactDOM.createPortal(
		<>
			<div className={ styles.dialog }>
				<ModalOverlay onClose={ onClose } />
				<div className={ styles.modalContainer }>
					<div className={ cn(styles.modal, 'p-10') }>
						<ModalHeader onClose={ onClose }>{ header }</ModalHeader>
						{ children }
					</div>
				</div>
			</div>
		</>,
		modalRoot
	));
}

export default Modal;
