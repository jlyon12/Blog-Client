import { Outlet } from 'react-router';
import Header from 'src/components/Header';

const PageLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default PageLayout;
