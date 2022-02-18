import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FC } from 'react';

const ProtectedRoute: FC<RouteProps> = ({ children, ...props }) => {
	// TODO: Типизация store
	// @ts-ignore
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
