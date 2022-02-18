import FormRegister from '../../components/form-register/form-register';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './register.module.css';

const Register = () => {
	// TODO: Типизация store
	// @ts-ignore
	const isAuth = useSelector(store => store.user.isAuth);
	const { state } = useLocation<{ from: string }>();

	if (isAuth) {
		return <Redirect to={ state?.from || '/' } />;
	}

	return (
		<div className={ 'pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Регистрация</h1>
			<div className={ styles.form }>
				<FormRegister />
			</div>
		</div>
	);
};

export default Register;
