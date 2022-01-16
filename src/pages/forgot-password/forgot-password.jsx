import FormForgotPassword from '../../components/form-forgot-password/form-forgot-password';
import cn from 'classnames';

import styles from './forgot-password.module.css';

const ForgotPassword = () => {
	return (
		<main className={ 'container pl-5 pr-5 pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Восстановление пароля</h1>
			<div className={ styles.form }>
				<FormForgotPassword />
			</div>
		</main>
	);
};

export default ForgotPassword;