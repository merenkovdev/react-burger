import { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm, Controller  } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { changeUserData } from '../../services/actions/user';
import EditableInput from '../../components/editable-input/editable-input';
import styles from './profile-edit.module.css';

// const ERRORS_FORM = {
// 	'email or password are incorrect': 'Некорректный email или пароль',
// 	default: 'При авторизации пользователя произошла ошибка',
// };

const ProfileEdit = () => {
	const {
		changeUserData: {
			isRequested,
		},
		user: {
			name,
			email,
		},
	} = useSelector(store => store.user);


	const {
		handleSubmit,
		reset,
		setValue,
		control,
		formState: {
			isDirty,
			dirtyFields,
		},
	} = useForm({ name, email, password: '' });

	const dispatch = useDispatch();
	const clearValue = (name) => setValue(name, '');

	const onCancel = () => {
		reset({ name, email, password: '' });
	};

	const onSubmit = (data) => {
		const requestData = Object.keys(dirtyFields)
			.reduce((acum, field) => {
				acum[field] = data[field];
				return acum;
			}, {});
		dispatch(changeUserData(requestData));
	};
	useEffect(() => {
		reset({ name, email });
	}, [reset, email, name]);

	return (
		<form className={ styles.form } onSubmit={handleSubmit(onSubmit)}>
			<div className="pb-6">
				<Controller
					name={'name'}
					control={control}
					render={({ field }) =>
						<EditableInput
							{...field}
							clearValue={ clearValue }
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
					render={({ field }) =>
						<EditableInput
							{ ...field }
							clearValue={ clearValue }
							placeholder={'Логин'}
						/>
					}
				/>
			</div>
			<div className="pb-6">
				<Controller
					name={'password'}
					control={control}
					render={({ field }) =>
						<EditableInput
							{ ...field }
							clearValue={ clearValue }
							type="password"
							placeholder={'Пароль'}
						/>
					}
				/>
			</div>
			{/* { hasError &&
				<p className="text text_type_main-small text_color_error pb-6">
					{ ERRORS_FORM[error] || ERRORS_FORM.default }
				</p>
			} */}
			{ isDirty &&
				<div className={ styles.btns }>
					<Button type="secondary"
						size="medium"
						onClick={ onCancel }
						{...(isRequested ? {
							disabled: true,
						} : {})}
					>Отмена</Button>
					<Button type="primary"
						size="medium"
						{...(isRequested ? {
							disabled: true,
						} : {})}
					>
						{ isRequested ?
							'...Сохранение' :
							'Сохранить'
						}
					</Button>
				</div>
			}
		</form>
	);
};

export default ProfileEdit;