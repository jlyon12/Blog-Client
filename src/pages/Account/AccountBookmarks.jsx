import { useEffect } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import useBookmarksContext from 'src/hooks/useBookmarksContext';
import PostCard from 'src/components/PostCard/PostCard';
import styles from './AccountBookmarks.module.scss';
const AccountBookmarks = () => {
	const { bookmarks, dispatch } = useBookmarksContext();
	const { user } = useAuthContext();
	useEffect(() => {
		const fetchUserBookmarks = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${
					user.id
				}/bookmarks`,
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);

			const json = await res.json();
			if (res.ok) {
				dispatch({ type: 'SET_BOOKMARKS', payload: json.data.bookmarks });
			}
		};

		fetchUserBookmarks();
	}, [dispatch, user]);

	return (
		<section className={styles.bookmarks}>
			{bookmarks &&
				bookmarks.map((bookmark) => (
					<PostCard post={bookmark} key={bookmark._id} />
				))}
		</section>
	);
};

export default AccountBookmarks;
