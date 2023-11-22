import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './AccountLayout.module.scss';
const AccountLayout = () => {
	const { user } = useAuthContext();
	const [userProfile, setUserProfile] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const getUserProfile = async () => {
			setIsLoading(true);
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${user.id}`,
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);

			const json = await res.json();

			if (res.ok) {
				setIsLoading(false);
				setUserProfile(json.data);
			}
		};
		getUserProfile();
	}, [user]);
	return (
		<main className={styles.main}>
			{isLoading ? (
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
			) : (
				<div className={styles.accountHeader}>
					<h2>Welcome back, {userProfile.first_name}</h2>
					<nav className={styles.nav}>
						<ul>
							<li>
								<NavLink
									className={({ isActive }) => isActive && styles.active}
									to="/user/me/bookmarks"
								>
									Bookmarks
								</NavLink>
							</li>
							<li>
								<NavLink
									className={({ isActive }) => isActive && styles.active}
									to="/user/me/comments"
								>
									Comments
								</NavLink>
							</li>
							<li>
								<NavLink
									className={({ isActive }) => isActive && styles.active}
									to="/user/me/settings"
								>
									Settings
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			)}
			<Outlet context={[userProfile, setUserProfile]} />
		</main>
	);
};

export default AccountLayout;
