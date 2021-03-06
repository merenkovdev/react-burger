import FormResetPassword from '../../components/form-reset-password/form-reset-password';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import cn from 'classnames';

import styles from './reset-password.module.css';

const ResetPassword = () => {
	const isAuth = useSelector(store => store.user.isAuth);
	const { state } = useLocation<{ from: string }>();

	if (isAuth) {
		return <Redirect to={ state?.from || '/' } />;
	}

	return (
		<div className={ 'pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Восстановление пароля</h1>
			<div className={ styles.form }>
				<FormResetPassword />
			</div>
		</div>
	);
};

export default ResetPassword;
