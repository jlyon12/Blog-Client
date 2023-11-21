import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import useBookmarksContext from 'src/hooks/useBookmarksContext';
import useAuthContext from 'src/hooks/useAuthContext';
import PostCard from 'src/components/PostCard/PostCard';

import styles from './Home.module.scss';
const Home = () => {
	const [publicPosts, setPublicPosts] = useState(null);
	const { dispatch } = useBookmarksContext();
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchPublicPosts = async () => {
			setIsLoading(true);
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`
			);

			const json = await res.json();

			if (!res.ok) {
				setIsLoading(false);
			}
			if (res.ok) {
				setIsLoading(false);
				setPublicPosts(json.data);
			}
		};
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

		fetchPublicPosts();
		fetchUserBookmarks();
	}, [dispatch, user]);
	return (
		<main className={styles.main}>
			{isLoading ? (
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
			) : (
				<>
					<section>
						<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>

						<div className={styles.recentPosts}>
							{publicPosts &&
								publicPosts
									.slice(0, 4)
									.map((post, i) => (
										<PostCard
											className={`postCard-${i}`}
											key={post._id}
											post={post}
										/>
									))}
						</div>
					</section>
					<section>
						<h2 className={styles.sectionTitle}>All Blog Posts</h2>

						<div className={styles.allPosts}>
							{publicPosts &&
								publicPosts
									.slice(4)
									.map((post) => <PostCard key={post._id} post={post} />)}
						</div>
					</section>
				</>
			)}
		</main>
	);
};

export default Home;
