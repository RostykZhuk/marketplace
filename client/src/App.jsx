import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
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
		<BrowserRouter>
			<Header />
			<Routes>
				{routes.map(route => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
