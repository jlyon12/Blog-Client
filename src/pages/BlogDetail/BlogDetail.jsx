import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import PostCard from 'src/components/PostCard/PostCard';
import Tag from 'src/components/Tag/Tag';
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
				setPosts(json.data);
			}
		};
		const fetchSinglePost = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}`
			);

			const json = await res.json();
			if (res.ok) {
				setPost(json.data);
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
									// eslint-disable-next-line react/no-danger
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(post.body),
									}}
								/>
								<div className={styles.footer}>
									{post.tags.map((tag) => (
										<Tag key={post._id + tag} tag={tag} />
									))}
								</div>
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
