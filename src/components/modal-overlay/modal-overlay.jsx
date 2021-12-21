import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
	return (
		<div onClick={ props.onClose } className={ styles.overlay }></div>
	);
};

export default ModalOverlay;

ModalOverlay.propTypes = {
	onClose: PropTypes.func,
};
