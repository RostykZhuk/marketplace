import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/sign-in', element: <SignIn /> },
	{ path: '/sign-up', element: <SignUp /> },
	{ path: '/about', element: <About /> },
	{ path: '/profile', element: <Profile /> },
];

function App() {
	return (
		<div className='text-3xl font-bold underline text-yellow-500'>
			<BrowserRouter>
				<Routes>
					{routes.map(route => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
