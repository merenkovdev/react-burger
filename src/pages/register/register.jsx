import FormRegister from '../../components/form-register/form-register';
import cn from 'classnames';

import styles from './register.module.css';

const Register = () => {
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
