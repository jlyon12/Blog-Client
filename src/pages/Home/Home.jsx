import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import useBookmarksContext from 'src/hooks/useBookmarksContext';
import useAuthContext from 'src/hooks/useAuthContext';
import PostCard from 'src/components/PostCard/PostCard';
import Pagination from 'src/components/Pagination/Pagination';
import styles from './Home.module.scss';
const Home = () => {
	const [recentPosts, setRecentPosts] = useState(null);
	const [allPosts, setAllPosts] = useState(null);
	const { dispatch } = useBookmarksContext();
	const { user } = useAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const pageSize = 6;
	useEffect(() => {
		const fetchRecentPosts = async () => {
			setIsLoading(true);
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/?pageSize=${4}`
			);

			const json = await res.json();

			if (!res.ok) {
				setIsLoading(false);
			}
			if (res.ok) {
				setRecentPosts(json.data);
				setIsLoading(false);
			}
		};

		fetchRecentPosts();
	}, []);
	useEffect(() => {
		const fetchAllPosts = async () => {
			setIsLoading(true);

			const res = await fetch(
				`${
					import.meta.env.VITE_API_CROSS_ORIGIN
				}/api/posts/?page=${page}&pageSize=${pageSize}`
			);

			const json = await res.json();

			if (!res.ok) {
				setIsLoading(false);
			}
			if (res.ok) {
				setAllPosts(json.data);
				setIsLoading(false);
				setTotalCount(json.metadata.totalCount);
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

		fetchAllPosts();
		fetchUserBookmarks();
	}, [dispatch, page, pageSize, user]);
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
							{recentPosts &&
								recentPosts.map((post, i) => (
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
							{allPosts &&
								allPosts.map((post) => <PostCard key={post._id} post={post} />)}
						</div>
						<Pagination
							page={page}
							setPage={setPage}
							totalCount={Number(totalCount)}
							pageSize={Number(pageSize)}
						/>
					</section>
				</>
			)}
		</main>
	);
};

export default Home;
