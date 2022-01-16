import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	FORM_NAME_FORGOT_PASSWORD,
} from '../../utils/constants';
import {
	requestForgotForm,
	actionChangeValueForgotForm,
} from '../../services/actions/forms';
import styles from './form-forgot-password.module.css';

const FormForgotPassword = () => {
	const { email } = useSelector(store => store.forms[FORM_NAME_FORGOT_PASSWORD]);
	const dispatch = useDispatch();

	const handleChange = (event) => {
		dispatch(actionChangeValueForgotForm('email', event.target.value));
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		dispatch(requestForgotForm({ email }));
	};

	return (
		<form className={ styles.form } onSubmit={handleSubmitForm}>
			<div className="pb-6">
				<Input
					type={'email'}
					placeholder={'Укажите e-mail'}
					onChange={handleChange}
					value={email}
					name={'email'}
					error={false}
				/>
			</div>
			<Button type="primary" size="medium">
				Восстановить
			</Button>
			<div className="pt-20">
				<p className="text text_type_main-small pb-4">
					<span className="text_color_inactive">Вспомнили пароль? </span>
					<Link className={ styles.link } to="/register">Войти</Link>
				</p>
			</div>
		</form>
	);
};

export default FormForgotPassword;