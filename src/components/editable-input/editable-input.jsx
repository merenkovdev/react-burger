import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

const EditableInput = forwardRef((props, ref) => {
	const { clearValue, name } = props;
	const [ disabled, setDisabled ] = useState(true);

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

EditableInput.propTypes = {
	clearValue: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
};