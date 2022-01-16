import FormLogin from '../../components/form-login/form-login';
import cn from 'classnames';

import styles from './login.module.css';

const Login = () => {
	return (
		<main className={ 'container pl-5 pr-5 pt-30' }>
			<h1 className={ cn(styles.header, 'text text_type_main-medium mb-6') }>Вход</h1>
			<div className={ styles.form }>
				<FormLogin />
			</div>
		</main>
	);
};

export default Login;
