import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { useSelector, useDispatch } from  '../../services/hooks';

import PasswordInput from '../password-input/password-input';
import { register } from '../../services/actions/user';
import styles from './form-register.module.css';

const defaultValuesForm = {
	email: '',
	password: '',
	name: '',
};

const FormRegister: FC = () => {
	const {
		handleSubmit,
		control,
	} = useForm<typeof defaultValuesForm>({
		defaultValues: defaultValuesForm,
	});
	const { hasError, error, isRequested } = useSelector(store => store.user.register);
	const dispatch = useDispatch();

	const onSubmit = (data: typeof defaultValuesForm) => {
		dispatch(register(data));
	};

	return (
		<form className={ styles.form } onSubmit={handleSubmit(onSubmit)}>
			<div className="pb-6">
				<Controller
					name={'name'}
					control={control}
					rules={{ required: true }}
					render={({ field }) =>
						<Input
							{...field}
							type={'text'}
							placeholder={'Имя'}
						/>
					}
				/>
			</div>
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
			{ hasError && error &&
				<p className="text text_type_main-small text_color_error pb-6">При созднии пользователя произошла ошибка</p>
			}
			<Button type="primary" size="medium"
				{...(isRequested ? {
					disabled: true,
				} : {})}
			>
				{ isRequested ?
					'...Регистрация' :
					'Зарегистрироваться'
				}
			</Button>
			<div className="pt-20">
				<p className="text text_type_main-small">
					<span className="text_color_inactive">Уже зарегистрированы? </span>
					<Link className={ styles.link } to="/login">Войти</Link>
				</p>
			</div>
		</form>
	);
};

export default FormRegister;