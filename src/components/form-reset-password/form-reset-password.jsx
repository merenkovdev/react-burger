import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';

import { requestReset } from '../../services/actions/user';
import PasswordInput from '../password-input/password-input';
import styles from './form-reset-password.module.css';

const defaultValuesForm = {
	password: '',
	token: '',
};

const FormResetPassword = () => {
	const {
		hasError = false,
	} = useSelector(store => store.user?.reset);
	const {
		handleSubmit,
		control,
	} = useForm({
		defaultValues: defaultValuesForm,
	});
	const dispatch = useDispatch();
	const onSubmitForm = ({ password, token }) => {
		dispatch(requestReset({ password, token }));
	};

	return (
		<form className={ styles.form } onSubmit={ handleSubmit(onSubmitForm) }>
			<div className="pb-6">
				<Controller
					name={'password'}
					control={control}
					rules={{ required: true }}
					render={({ field }) =>
						<PasswordInput
							{...field}
							type={'password'}
							placeholder={'Введите новый пароль'}
							icon={'ShowIcon'}
						/>
					}
				/>
			</div>

			<div className="pb-6">
				<Controller
					name="token"
					control={control}
					rules={{ required: true }}
					render={({ field }) =>
						<Input
							{...field}
							type="text"
							error={hasError}
							placeholder={'Введите код из письма'}
							errorText={'Неверный токен сброса'}
						/>
					}
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