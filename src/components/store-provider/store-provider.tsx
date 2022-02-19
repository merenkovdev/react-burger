import { Provider } from 'react-redux';
import { FC } from 'react';

import store from '../../services/store';

const StoreProvider: FC = ({ children }) => (
	<Provider store={ store }>{ children }</ Provider>
);

export default StoreProvider;
