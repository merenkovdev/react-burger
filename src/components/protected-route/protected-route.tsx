import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({ children, ...props }) => {
	const isAuth = useSelector(store => store.user.isAuth);

	return (
		<Route {...props}
			render={({ location }) => (
				isAuth ? (
					children
				) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: location }
					}} />
				)
			) }
		/>
	);
};

export default ProtectedRoute;
