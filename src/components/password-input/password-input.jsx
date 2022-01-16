import { useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const PasswordInput = (props) => {
	const [ type, setType ] = useState('password');
	const changeType = () => {
		setType(type === 'password' ? 'text' : 'password');
	};

	return (
		<Input
			{ ...props }
			type={ type }
			onIconClick={ changeType }
		/>
	);
};

export default PasswordInput;