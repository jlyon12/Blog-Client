import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { format } from 'date-fns';
import PostCard from 'src/components/PostCard/PostCard';
import CommentSection from 'src/components/CommentSection/CommentSection';
import NewsLetterForm from 'src/components/NewsLetterForm/NewsLetterForm';
import styles from './BlogDetail.module.scss';
const BlogDetail = () => {
	const [posts, setPosts] = useState(null);
	const [post, setPost] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/`
			);

			const json = await res.json();

			if (res.ok) {
				setPosts(json);
			}
		};
		const fetchSinglePost = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}`
			);

			const json = await res.json();
			if (res.ok) {
				setPost(json);
			}
		};

		fetchSinglePost();
		fetchPosts();
	}, [id]);
	return (
		<main className={styles.main}>
			<div className={styles.contentWrapper}>
				<section className={styles.recentPosts}>
					<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
					{posts &&
						posts.map((post) => <PostCard key={post._id} post={post} />)}
				</section>
				<section className={styles.blogWrapper}>
					{post && (
						<>
							<div key={post._id} className={styles.blog}>
								<p className={styles.date}>
									{format(new Date(post.createdAt), 'PPPP')}
								</p>
								<h3 className={styles.title}>{post.title}</h3>
								<div
									className={styles.body}
									dangerouslySetInnerHTML={{
										__html: post.body,
									}}
								/>
							</div>
							<CommentSection post={post} />
						</>
					)}
					<NewsLetterForm />
				</section>
			</div>
		</main>
	);
};

export default BlogDetail;
