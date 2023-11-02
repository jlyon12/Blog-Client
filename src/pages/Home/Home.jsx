import { useEffect, useState } from 'react';
import PostCard from 'src/components/PostCard/PostCard';

import styles from './Home.module.scss';
const Home = () => {
	const [publicPosts, setPublicPosts] = useState(null);

	useEffect(() => {
		const fetchPublicPosts = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`
			);

			const json = await res.json();

			if (res.ok) {
				setPublicPosts(json);
			}
		};

		fetchPublicPosts();
	}, []);
	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
				{publicPosts &&
					publicPosts
						.slice(0, 3)
						.map((post) => <PostCard key={post._id} post={post} />)}
			</section>
			<section>
				<h2 className={styles.sectionTitle}>All Blog Posts</h2>
				{publicPosts &&
					publicPosts
						.slice(3, -1)
						.map((post) => <PostCard key={post._id} post={post} />)}
			</section>
		</main>
	);
};

export default Home;
