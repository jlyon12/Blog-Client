import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { format, formatDistance } from 'date-fns';
import PostCard from 'src/components/PostCard/PostCard';
import NewsLetterCTA from 'src/components/NewsLetterCTA/NewsLetterCTA';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './BlogDetail.module.scss';
const Home = () => {
	const [posts, setPosts] = useState(null);
	const [blog, setBlog] = useState(null);
	const [comments, setComments] = useState(null);
	const [comment, setComment] = useState('');
	const { user } = useAuthContext();
	const { id } = useParams();

	const fetchComments = useCallback(async () => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${id}/comments`
		);

		const json = await res.json();
		if (res.ok) {
			setComments(json);
		}
	}, [id]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${blog._id}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ body: comment }),
			}
		);
		if (res.ok) {
			setComment(() => '');
			fetchComments();
		}
	};

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
				setBlog(json);
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
							<div className={styles.commentSection}>
								<h3>Comments</h3>
								{comments &&
									comments.map((comment) => {
										return (
											<>
												<div key={comment._id} className={styles.comment}>
													<div className={styles.header}>
														<p className={styles.author}>
															@ {comment.author.username}
														</p>
														<p className={styles.date}>
															{formatDistance(
																new Date(comment.createdAt),
																new Date()
															)}
														</p>
													</div>
													<p className={styles.body}>{comment.body}</p>
													<div className={styles.footer}></div>
												</div>
												<hr />
											</>
										);
									})}
								{user ? (
									<form className={styles.form} onSubmit={handleSubmit}>
										<fieldset>
											<label htmlFor="comment" className={styles.formControl}>
												<textarea
													name="comment"
													id="comment"
													placeholder="Leave a comment..."
													onChange={(e) => setComment(e.target.value)}
													// cols="30"
													// rows="10"
												>
													{comment}
												</textarea>
											</label>
										</fieldset>

										<button className={styles.btn}>Add</button>
									</form>
								) : (
									<p className={styles.noUser}>
										Please <Link to="/login">Log In</Link> to leave a comment
									</p>
								)}
							</div>
						</>
					)}
					<NewsLetterCTA />
				</section>
			</div>
		</main>
	);
};

export default Home;
