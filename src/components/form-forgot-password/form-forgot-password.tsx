import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useSelector, useDispatch } from  '../../services/hooks';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { forgot } from '../../services/actions/user';
import styles from './form-forgot-password.module.css';

const defaultValuesForm = {
	email: '',
};

const FormForgotPassword: FC = () => {
	const {
		handleSubmit,
		control,
	} = useForm<{ email: string }>({
		defaultValues: defaultValuesForm,
	});
	const { isRequested, success } = useSelector(store => store.user.forgot);
	const dispatch = useDispatch();

	const onSubmitForm = ({ email }: { email: string }) => {
		dispatch(forgot({ email }));
	};

	if (success) {
		return <Redirect to="/reset-password" />
	}

	return (
		<form className={ styles.form } onSubmit={handleSubmit(onSubmitForm)}>
			<div className="pb-6">
			<Controller
				name="email"
				control={control}
				rules={{ required: true }}
				render={({ field }) =>
					<Input
						{...field}
						type="email"
						placeholder={'Укажите e-mail'}
					/>
				}
			/>
			</div>
			<Button type="primary"
				size="medium"
				{...(isRequested ? {
					disabled: true,
				} : {})}
			>
				{ isRequested ?
					'...Отправляем' :
					'Восстановить'
				}
			</Button>
			<div className="pt-20">
				<p className="text text_type_main-small pb-4">
					<span className="text_color_inactive">Вспомнили пароль? </span>
					<Link className={ styles.link } to="/login">Войти</Link>
				</p>
			</div>
		</form>
	);
};

export default FormForgotPassword;