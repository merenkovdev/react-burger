import FormResetPassword from '../../components/form-reset-password/form-reset-password';
import cn from 'classnames';

import styles from './reset-password.module.css';

const ResetPassword = () => {
	return (
		<main className={ 'container pl-5 pr-5 pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Восстановление пароля</h1>
			<div className={ styles.form }>
				<FormResetPassword />
			</div>
		</main>
	);
};

export default ResetPassword;
