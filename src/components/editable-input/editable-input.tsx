import { useState, forwardRef } from 'react';
import { TEditableInput } from '../../types/form';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const EditableInput = forwardRef<HTMLInputElement, TEditableInput>((props, ref) => {
	const { clearValue, name } = props;
	const [ disabled, setDisabled ] = useState<boolean>(true);

	return (
		<Input
			{ ...props }
			ref={ ref }
			disabled={ disabled }
			onIconClick={ disabled ?
				() => setDisabled(false) :
				() => clearValue(name)
			}
			icon={ disabled ? 'EditIcon' : 'CloseIcon' }
		/>
	);
});

export default EditableInput;
