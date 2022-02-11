import FormLogin from '../../components/form-login/form-login';
import { FC } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './login.module.css';

const Login: FC = () => {
	// TODO: Типизация store
	// @ts-ignore
	const isAuth = useSelector(store => store.user.isAuth);
	const { state } = useLocation<{ from?: string }>();

	if (isAuth) {
		return <Redirect to={ state?.from || '/' } />;
	}

	return (
		<div className={ 'pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Вход</h1>
			<div className={ styles.form }>
				<FormLogin />
			</div>
		</div>
	);
};

export default Login;
