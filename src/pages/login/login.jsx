import FormLogin from '../../components/form-login/form-login';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import styles from './login.module.css';

const Login = () => {
	const isAuth = useSelector(store => store.user.isAuth);

	return (
		<>
			{ isAuth &&
				<Redirect to='/' />
			}
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
