import { forwardRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const PasswordInput = forwardRef((props, ref) => {
	const [ type, setType ] = useState('password');
	const changeType = () => {
		setType(type === 'password' ? 'text' : 'password');
	};
	const icon = type === 'password' ? 'ShowIcon' : 'HideIcon';

	return (
		<Input
			{ ...props }
			ref={ ref }
			type={ type }
			onIconClick={ changeType }
			icon={ icon }
		/>
	);
});

export default PasswordInput;