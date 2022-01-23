import { Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const ProtectedRoute = ({ children, ...props }) => {
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
