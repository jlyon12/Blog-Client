import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import PostCard from 'src/components/PostCard/PostCard';
import Tag from 'src/components/Tag/Tag';
import BookmarkToggleBtn from 'src/components/BookmarkToggleBtn/BookmarkToggleBtn';
import CommentSection from 'src/components/CommentSection/CommentSection';
import NewsLetterForm from 'src/components/NewsLetterForm/NewsLetterForm';
import styles from './BlogDetail.module.scss';

const BlogDetail = () => {
	const [posts, setPosts] = useState(null);
	const [post, setPost] = useState(null);
	const [userBookmarks, setUserBookmarks] = useState([]);
	const { user } = useAuthContext();
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
				setUserBookmarks(json.data.bookmarks);
			}
		};
		if (user) {
			fetchUserBookmarks();
		}
		fetchSinglePost();
		fetchPosts();
	}, [id, user]);

	return (
		<main className={styles.main}>
			<div className={styles.contentWrapper}>
				<section className={styles.recentPosts}>
					<h2 className={styles.sectionTitle}>Recent Blog Posts</h2>
					{posts &&
						posts
							.slice(0, 5)
							.map((post) => <PostCard key={post._id} post={post} />)}
				</section>
				<section className={styles.blogWrapper}>
					{post && (
						<>
							<div key={post._id} className={styles.blog}>
								<BookmarkToggleBtn
									userBookmarks={userBookmarks}
									setUserBookmarks={setUserBookmarks}
									post={post}
								/>
								<p className={styles.date}>
									{format(new Date(post.createdAt), 'PPPP')}
								</p>

								<h3 className={styles.title}>{post.title}</h3>
								<div className={styles.imgContainer}>
									<div className={styles.img}>
										<img src={post.img.url} alt="" />
									</div>
									<Link className={styles.imgLink} to={post.img.src_link}>
										{post.img.src}
									</Link>
								</div>
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
					<div className={styles.newsletter}>
						<NewsLetterForm />
					</div>
				</section>
			</div>
		</main>
	);
};

export default BlogDetail;
