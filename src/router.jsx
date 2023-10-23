import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageLayout from 'src/layouts/PageLayout';
import Home from 'src/pages/Home/Home';
import BlogDetail from 'src/pages/BlogDetail/BlogDetail';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: '/posts/:id', element: <BlogDetail /> },
			],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;
