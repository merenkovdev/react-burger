import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import cn from 'classnames';

import { reset, returnResetInitialState } from '../../services/actions/user';
import PasswordInput from '../password-input/password-input';
import styles from './form-reset-password.module.css';
import { useEffect } from 'react';

const defaultValuesForm = {
	password: '',
	token: '',
};

const TIMEOUT_SUCCESS_REDIRECT = 1000;

const FormResetPassword = () => {
	const {
		handleSubmit,
		control,
	} = useForm({
		defaultValues: defaultValuesForm,
	});
	const dispatch = useDispatch();
	const history = useHistory();
	const {
		success: resetSuccess,
		hasError,
		isRequested,
	} = useSelector(store => store.user.reset);
	const { success: forgotSucces } = useSelector(store => store.user.forgot);
	const onSubmitForm = ({ password, token }) => {
		dispatch(reset({ password, token }));
	};

	useEffect(() => {
		if (resetSuccess) {
			setTimeout(() => {
				history.replace({ pathname: '/login' });
				dispatch(returnResetInitialState);
			}, TIMEOUT_SUCCESS_REDIRECT);
		}
	}, [ resetSuccess, history, dispatch ]);

	if (!forgotSucces) {
		return <Redirect to="/forgot-password" />
	}

	if (resetSuccess) {
		return (
			<p className={ cn(styles.success, 'text text_type_main-medium text_color_success pb-6') }>
				Пароль успешно сброшен
			</p>
		);
	}

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
							placeholder={'Введите новый пароль'}
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
			{ hasError &&
				<p className="text text_type_main-small text_color_error pb-6">
					При восстановлении пароля произошла ошибка
				</p>
			}
			<Button type="primary"
				size="medium"
				{...(isRequested ? {
					disabled: true,
				} : {})}
			>{
				isRequested ?
					'...Сохранение' :
					'Сохранить'
			}</Button>
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