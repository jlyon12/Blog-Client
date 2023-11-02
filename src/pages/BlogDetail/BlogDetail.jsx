import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import PostCard from 'src/components/PostCard/PostCard';
import NewsLetterCTA from 'src/components/NewsLetterCTA/NewsLetterCTA';

import styles from './BlogDetail.module.scss';
const Home = () => {
	const [publicPosts, setPublicPosts] = useState(null);
	const [blog, setBlog] = useState(null);
	const { id } = useParams();
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
		const fetchSinglePost = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}`
			);

			const json = await res.json();
			if (res.ok) {
				setBlog(json);
			}
		};
		fetchSinglePost();
		fetchPublicPosts();
	}, [id]);
	return (
		<main className={styles.main}>
			<div className={styles.contentWrapper}>
				<section className={styles.recentPosts}>
					<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
					{publicPosts &&
						publicPosts.map((post) => <PostCard key={post._id} post={post} />)}
				</section>
				<section className={styles.blogWrapper}>
					{blog && (
						<>
							<div key={blog._id} className={styles.blog}>
								<p className={styles.date}>
									{format(new Date(blog.createdAt), 'PPPP')}
								</p>
								<h3 className={styles.title}>{blog.title}</h3>
								<div
									className={styles.body}
									dangerouslySetInnerHTML={{
										__html: blog.body,
									}}
								/>
							</div>
							<div></div>
						</>
					)}
					<NewsLetterCTA />
				</section>
			</div>
		</main>
	);
};

export default Home;
