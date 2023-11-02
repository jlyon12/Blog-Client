import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';

import useAuthContext from 'src/hooks/useAuthContext';

import PageLayout from 'src/layouts/PageLayout';
import NotFound from './pages/NotFound/NotFound';
import Home from 'src/pages/Home/Home';
import Login from 'src/pages/Login/Login';
import Signup from './pages/Signup/Signup';
import BlogDetail from 'src/pages/BlogDetail/BlogDetail';

const Router = () => {
	const { user } = useAuthContext();

	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: 'login', element: user ? <Navigate to="/" /> : <Login /> },
				{ path: 'signup', element: user ? <Navigate to="/" /> : <Signup /> },
				{ path: '/posts/:id', element: <BlogDetail /> },
				{ path: '*', element: <NotFound /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;
