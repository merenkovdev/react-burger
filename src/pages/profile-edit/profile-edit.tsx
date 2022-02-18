import styles from './profile-edit.module.css';

import { useEffect, useCallback, FC } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm, Controller  } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { TDataForm } from '../../types/form';

import { changeUserData } from '../../services/actions/user';
import EditableInput from '../../components/editable-input/editable-input';

const ProfileEdit: FC = () => {
	const {
		changeUserData: {
			isRequested,
			hasError,
		},
		user: {
			name,
			email,
		},
	// TODO: Типизация store
	// @ts-ignore
	} = useSelector(store => store.user);

	const {
		handleSubmit,
		reset,
		setValue,
		control,
		formState: {
			isDirty,
		},
	} = useForm<TDataForm>({ defaultValues: {
		name, email, password: '',
	}});

	const dispatch = useDispatch();
	const clearValue = (name: string) => setValue(name, '');
	const resetChanges = useCallback(
		() => reset({ name, email, password: '' }),
		[reset, name, email]
	);

	const onCancel = () => resetChanges();

	const onSubmit = (data: TDataForm) => {
		dispatch(changeUserData(data));
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