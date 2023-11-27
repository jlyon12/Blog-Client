import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';

import useAuthContext from 'src/hooks/useAuthContext';
import PageLayout from 'src/layouts/PageLayout';
import AccountLayout from 'src/layouts/AccountLayout';
import AccountBookmarks from 'src/pages/Account/AccountBookmarks';
import AccountSettings from 'src/pages/Account/AccountSettings';
import AccountComments from 'src/pages/Account/AccountComments';
import ProtectedRoute from 'src/utils/ProtectedRoute';
import NotFound from 'src/pages/NotFound/NotFound';
import Home from 'src/pages/Home/Home';
import PostsByTag from 'src/pages/PostsByTag/PostsByTag';
import Login from 'src/pages/Login/Login';
import Signup from 'src/pages/Signup/Signup';
import BlogDetail from 'src/pages/BlogDetail/BlogDetail';
import NewsLetter from 'src/pages/Newsletter/Newsletter';

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
				{ path: 'newsletter', element: <NewsLetter /> },
				{ path: '/posts/:id', element: <BlogDetail /> },
				{ path: '/tags/:tag', element: <PostsByTag /> },
				{
					path: 'user',
					element: <ProtectedRoute />,
					children: [
						{
							path: 'me',
							element: <AccountLayout />,
							children: [
								{
									path: 'bookmarks',
									element: <AccountBookmarks />,
								},
								{
									path: 'comments',
									element: <AccountComments />,
								},
								{
									path: 'settings',
									element: <AccountSettings />,
								},
							],
						},
					],
				},
				{ path: '*', element: <NotFound /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;
