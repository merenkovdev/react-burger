import styles from './modal-overlay.module.css';
import { FC } from 'react';

const ModalOverlay: FC<{ onClose: () => void }> = (props) => {
	return (
		<div onClick={ props.onClose } className={ styles.overlay }></div>
	);
};

export default ModalOverlay;
