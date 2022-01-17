import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { requestForgot } from '../../services/actions/user';
import styles from './form-forgot-password.module.css';

const defaultValuesForm = {
	email: '',
};

const FormForgotPassword = () => {
	const {
		handleSubmit,
		control,
	} = useForm({
		defaultValues: defaultValuesForm,
	});
	const dispatch = useDispatch();

	const onSubmitForm = ({ email }) => {
		dispatch(requestForgot({ email }));
	};

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