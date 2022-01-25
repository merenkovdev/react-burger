import { useEffect, useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm, Controller  } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { changeUserData } from '../../services/actions/user';
import EditableInput from '../../components/editable-input/editable-input';
import styles from './profile-edit.module.css';

const ProfileEdit = () => {
	const {
		changeUserData: {
			isRequested,
			hasError,
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
	} = useForm({ defaultValues: {
		name, email, password: '',
	}});

	const dispatch = useDispatch();
	const clearValue = (name) => setValue(name, '');
	const resetChanges = useCallback(
		() => reset({ name, email, password: '' }),
		[reset, name, email]
	);

	const onCancel = () => resetChanges();

	const onSubmit = (data) => {
		const requestData = Object.keys(dirtyFields)
			.reduce((acum, field) => {
				acum[field] = data[field];
				return acum;
			}, {});
		dispatch(changeUserData(requestData));
	};

	useEffect(() => {
		resetChanges();
	}, [resetChanges]);

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
			{ hasError &&
				<p className="text text_type_main-small text_color_error pb-6">
					Ошибка при сохранении данных
				</p>
			}
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