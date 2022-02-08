type TIcons = 'ShowIcon' | 'HideIcon' | 'CloseIcon' | 'EditIcon';

export type TInput = {
	type?: 'text' | 'email' | 'password';
	placeholder?: string;
	value: string;
	name?: string;
	success?: boolean;
	error?: boolean;
	disabled?: boolean;
	icon?: TIcons;
	errorText?: string;
	size?: 'default' | 'small';
	children?: React.ReactNode,
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
	onIconClick?(e: React.MouseEvent<HTMLDivElement>): void;
	onBlur?(e?: React.FocusEvent<HTMLInputElement>): void;
	onFocus?(e?: React.FocusEvent<HTMLInputElement>): void;
};

export type TEditableInput = TInput & {
	clearValue: (name: string | undefined) => void,
};
