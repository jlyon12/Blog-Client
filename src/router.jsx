import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageLayout from 'src/layouts/PageLayout';
import Home from 'src/pages/Home/Home';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <PageLayout />,
			children: [{ index: true, element: <Home /> }],
		},
	]);
	return <RouterProvider router={router} />;
};

export default Router;
