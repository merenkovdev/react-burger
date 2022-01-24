import FormLogin from '../../components/form-login/form-login';
import { Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './login.module.css';

const Login = () => {
	const isAuth = useSelector(store => store.user.isAuth);
	const { state } = useLocation();

	if (isAuth) {
		return <Redirect to={ state?.from || '/' } />;
	}

	return (
		<>
			{ !isAuth &&
				<div className={ 'pt-30' }>
					<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Вход</h1>
					<div className={ styles.form }>
						<FormLogin />
					</div>
				</div>
			}
		</>
	);
};

export default Login;
