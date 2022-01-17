import { useState, useRef } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const EditableInput = (props) => {
	const [ status, setStatus ] = useState(true);
	const input = useRef(null);
	const changeStatus = () => {
		setStatus(!status);
	};

	return (
		<Input
			{ ...props }
			ref={ input }
			disabled={ status }
			onIconClick={ changeStatus }
		/>
	);
};

export default EditableInput;