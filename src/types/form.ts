type TIcons = 'ShowIcon' | 'HideIcon' | 'CloseIcon' | 'EditIcon';

export type TInput = {
	value: string;
	name: string;
	type?: 'text' | 'email' | 'password';
	placeholder?: string;
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
	clearValue: (name: string) => void,
};

export type TDataForm = {
	[name: string]: string;
};
