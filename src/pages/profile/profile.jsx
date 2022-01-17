import cn from 'classnames';

import styles from './profile.module.css';
import { NavLink } from 'react-router-dom';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import EditableInput from '../../components/editable-input/editable-input';

const getClassesLink = isActive =>
	cn(
		'text text_type_main-medium pt-3 pb-3',
		{ 'text_color_inactive': !isActive },
		styles.link
	);

const Register = () => {
	return (
		<>
			<div className={ cn('pt-30', styles.container) }>
				<div className={ cn('mr-15', styles.menu) }>
					<nav>
						<ul className={ styles.list }>
							<li>
								<NavLink to="/profile" exact={ true } className={ getClassesLink }>Профиль</NavLink>
							</li>
							<li>
								<NavLink to="/profile/orders" exact={ true } className={ getClassesLink }>История заказов</NavLink>
							</li>
							<li>
								<NavLink to="/" exact={ true } className={ getClassesLink }>Выход</NavLink>
							</li>
						</ul>
					</nav>
					<p className={ cn(styles.info, 'pt-20 text text_type_main-default text_color_inactive') }>
						В этом разделе вы можете изменить свои персональные данные
					</p>
				</div>
				<form className={ styles.form } action="">
					<div className="pb-6">
						<EditableInput
							type={'text'}
							placeholder={'Имя'}
							icon={'EditIcon'}
							// onChange={e => console.log(e.target.value)}
							value={'value'}
							name={'name'}
							error={false}
							// ref={inputRef}
							errorText={'Ошибка'}
							size={'default'}
						/>
					</div>
					<div className="pb-6">
						<EditableInput
							type={'text'}
							placeholder={'Логин'}
							icon={'EditIcon'}
							// onChange={e => console.log(e.target.value)}
							value={'value2'}
							name={'login'}
							disabled={true}
							error={false}
							// ref={inputRef}
							errorText={'Ошибка'}
							size={'default'}
						/>
					</div>
					<div className="pb-6">
						<EditableInput
							type={'password'}
							placeholder={'Пароль'}
							// onChange={e => setValue(e.target.value)}
							icon={'EditIcon'}
							value={'value3'}
							name={'password'}
							disabled={true}
							error={false}
							// ref={inputRef}
							// onIconClick={onIconClick}
							errorText={'Ошибка'}
							size={'default'}
						/>
					</div>
				</form>
			</div>
		</>
	);
};

export default Register;
