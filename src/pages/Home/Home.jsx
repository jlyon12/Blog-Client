import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styles from './Home.module.scss';
const Home = () => {
	const [publicPosts, setPublicPosts] = useState(null);
	const truncate = (text) => {
		return text.substring(0, 175) + '...';
	};
	useEffect(() => {
		const fetchPublicPosts = async () => {
			const res = await fetch('http://localhost:3000/api/posts/published');

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
					publicPosts.slice(0, 3).map((post) => {
						const postPreview = truncate(post.body.split('.')[0]);

						return (
							<div key={post._id} className={styles.post}>
								<p className={styles.postDate}>
									{format(new Date(post.createdAt), 'PPPP')}
								</p>
								<h3 className={styles.postTitle}>{post.title}</h3>
								<div
									className={styles.postBody}
									dangerouslySetInnerHTML={{ __html: postPreview }}
								/>
							</div>
						);
					})}
			</section>
			<section>
				<h2 className={styles.sectionTitle}>All Blog Posts</h2>
				{publicPosts &&
					publicPosts.slice(3, -1).map((post) => {
						const postPreview = truncate(post.body.split('.')[0]);

						return (
							<div key={post._id} className={styles.post}>
								<p className={styles.postDate}>
									{format(new Date(post.createdAt), 'PPPP')}
								</p>
								<h3 className={styles.postTitle}>{post.title}</h3>
								<div
									className={styles.postBody}
									dangerouslySetInnerHTML={{ __html: postPreview }}
								/>
							</div>
						);
					})}
			</section>
		</main>
	);
};

export default Home;
