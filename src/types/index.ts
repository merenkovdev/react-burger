import { TOrder } from './api';

export type TAppLocation = {
	background?: {
		key: string;
		pathname: string;
		search: string;
		hash: string;
		state: unknown;
	};
};

export type TOrderLocation = TAppLocation & {
	order: TOrder;
};
