import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../services/actions/user';
import PasswordInput from '../password-input/password-input';
import styles from './form-login.module.css';

const ERRORS_FORM = {
	'email or password are incorrect': 'Некорректный email или пароль',
	default: 'При авторизации пользователя произошла ошибка',
}

const defaultValuesForm = {
	email: '',
	password: '',
};

const FormLogin = () => {
	const {
		handleSubmit,
		control,
	} = useForm({
		defaultValues: defaultValuesForm,
	});
	const { hasError, error, isRequested } = useSelector(store => store.user.login);
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		dispatch(login(data));
	};

	return (
		<form className={ styles.form } onSubmit={handleSubmit(onSubmit)}>
			<div className="pb-6">
				<Controller
					name={'email'}
					control={control}
					rules={{ required: true }}
					render={({ field }) =>
						<Input
							{...field}
							type={'email'}
							placeholder={'E-mail'}
						/>
					}
				/>
			</div>
			<div className="pb-6">
				<Controller
					name={'password'}
					control={control}
					rules={{ required: true }}
					render={({ field }) =>
						<PasswordInput
							{...field}
							placeholder={'Пароль'}
						/>
					}
				/>
			</div>
			{ hasError &&
				<p className="text text_type_main-small text_color_error pb-6">
					{ ERRORS_FORM[error] || ERRORS_FORM.default }
				</p>
			}
			<Button type="primary" size="medium"
				{...(isRequested ? {
					disabled: true,
				} : {})}
			>
				{ isRequested ?
					'...Войти' :
					'Войти'
				}
			</Button>
			<div className="pt-20">
				<p className="text text_type_main-small pb-4">
					<span className="text_color_inactive">Вы — новый пользователь? </span>
					<Link className={ styles.link } to="/register">Зарегистрироваться</Link>
				</p>
				<p className="text text_type_main-small">
					<span className="text_color_inactive">Забыли пароль? </span>
					<Link className={ styles.link } to="forgot-password">Восстановить пароль</Link>
				</p>
			</div>
		</form>
	);
};

export default FormLogin;