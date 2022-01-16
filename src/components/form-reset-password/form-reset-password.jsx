import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	FORM_NAME_RESET_PASSWORD,
} from '../../utils/constants';
import {
	requestResetForm,
	actionChangeValueResetForm,
} from '../../services/actions/forms';
import PasswordInput from '../password-input/password-input';
import cn from 'classnames';
import styles from './form-reset-password.module.css';

const FormResetPassword = () => {
	const {
		password,
		token,
		hasError,
	} = useSelector(store => store.forms[FORM_NAME_RESET_PASSWORD]);
	const dispatch = useDispatch();
	const handleChange = (event) => {
		dispatch(actionChangeValueResetForm( event.target.name, event.target.value));
	};
	const handleSubmitForm = (event) => {
		event.preventDefault();
		dispatch(requestResetForm({ password, token }));
	};

	return (
		<form className={ styles.form } onSubmit={ handleSubmitForm }>
			<div className="pb-6">
				<PasswordInput
					type={'password'}
					placeholder={'Введите новый пароль'}
					onChange={handleChange}
					value={ password }
					icon={'ShowIcon'}
					name={'password'}
					// error={false}
					// errorText={'Ошибка'}
				/>
			</div>

			<div className="pb-6">
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={handleChange}
					value={token}
					name={'token'}
					error={hasError}
					errorText={'Неверный токен сброса'}
				/>
			</div>
			<Button type="primary" size="medium">
				Сохранить
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

export default FormResetPassword;