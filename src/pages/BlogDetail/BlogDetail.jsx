import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PostCard from 'src/components/PostCard/PostCard';
import Comment from 'src/components/Comment/Comment';
import CommentForm from 'src/components/CommentForm/CommentForm';
import NewsLetterForm from 'src/components/NewsLetterForm/NewsLetterForm';
import useAuthContext from 'src/hooks/useAuthContext';

import styles from './BlogDetail.module.scss';
const BlogDetail = () => {
	const [posts, setPosts] = useState(null);
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState(null);
	const { id } = useParams();
	const { user } = useAuthContext();

	const fetchComments = useCallback(async () => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}/comments`
		);

		const json = await res.json();
		if (res.ok) {
			setComments(json);
		}
	}, [id]);

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
		fetchComments();
	}, [fetchComments, id]);
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
							<div className={styles.commentSection}>
								<h3>Comments</h3>
								{comments &&
									comments.map((comment) => (
										<Comment key={comment._id} comment={comment} />
									))}
								{user ? (
									<CommentForm
										postId={post._id}
										fetchComments={fetchComments}
									/>
								) : (
									<p className={styles.noUser}>
										Please <Link to="/login">Log In</Link> to leave a comment
									</p>
								)}
							</div>
						</>
					)}
					<NewsLetterForm />
				</section>
			</div>
		</main>
	);
};

export default BlogDetail;
