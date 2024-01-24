import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
function PrivateRoute() {
	const { currentUser } = useSelector(state => state.user);
	console.log(currentUser, 'currentUser');
	return currentUser !== null ? <Outlet /> : <Navigate to='/sign-in' />;
}

export default PrivateRoute;
