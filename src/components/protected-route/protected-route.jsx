import { Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

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

ProtectedRoute.propTypes = {
	children: PropTypes.node,
};
