import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import PostCard from 'src/components/PostCard/PostCard';

import styles from './Home.module.scss';
const Home = () => {
	const [publicPosts, setPublicPosts] = useState(null);
	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const fetchPublicPosts = async () => {
			setIsLoading(true);
			setErrors(null);
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`
			);

			const json = await res.json();

			if (!res.ok) {
				setIsLoading(false);
				setErrors(json.errors);
			}
			if (res.ok) {
				setIsLoading(false);
				setPublicPosts(json.data);
			}
		};

		fetchPublicPosts();
	}, []);
	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
				{publicPosts &&
					publicPosts
						.slice(0, 3)
						.map((post) => <PostCard key={post._id} post={post} />)}
			</section>
			<section>
				<h2 className={styles.sectionTitle}>All Blog Posts</h2>
				<DotLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
				{publicPosts &&
					publicPosts
						.slice(3)
						.map((post) => <PostCard key={post._id} post={post} />)}
			</section>
		</main>
	);
};

export default Home;
