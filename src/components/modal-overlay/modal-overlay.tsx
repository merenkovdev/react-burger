import styles from './modal-overlay.module.css';

const ModalOverlay = (props: { onClose: () => void }) => {
	return (
		<div onClick={ props.onClose } className={ styles.overlay }></div>
	);
};

export default ModalOverlay;