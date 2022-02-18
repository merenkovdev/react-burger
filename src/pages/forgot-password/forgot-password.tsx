import FormForgotPassword from '../../components/form-forgot-password/form-forgot-password';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './forgot-password.module.css';

const ForgotPassword = () => {
	// TODO: Типизация store
	// @ts-ignore
	const isAuth = useSelector(store => store.user.isAuth);
	const { state } = useLocation<{ from?: string }>();

	if (isAuth) {
		return <Redirect to={ state?.from || '/' } />;
	}

	return (
		<div className={ 'pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Восстановление пароля</h1>
			<div className={ styles.form }>
				<FormForgotPassword />
			</div>
		</div>
	);
};

export default ForgotPassword;
