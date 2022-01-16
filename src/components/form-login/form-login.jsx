import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './form-login.module.css';

const FormLogin = () => {
	return (
		<form className={ styles.form } action="">
			<div className="pb-6">
				<Input
					type={'text'}
					placeholder={'E-mail'}
					// onChange={e => setValue(e.target.value)}
					// value={value}
					name={'email'}
					error={false}
					// ref={inputRef}
					errorText={'Ошибка'}
					size={'default'}
				/>
			</div>
			<div className="pb-6">
				<Input
					type={'password'}
					placeholder={'Пароль'}
					// onChange={e => setValue(e.target.value)}
					icon={'ShowIcon'}
					// value={value}
					name={'password'}
					error={false}
					// ref={inputRef}
					// onIconClick={onIconClick}
					errorText={'Ошибка'}
					size={'default'}
				/>
			</div>
			<Button type="primary" size="medium">
				Войти
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