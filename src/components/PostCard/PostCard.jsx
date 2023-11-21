import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from 'react-icons/ri';
import DOMPurify from 'dompurify';
import propTypes from 'prop-types';
import { format } from 'date-fns';
import Tag from 'src/components/Tag/Tag';
import styles from './PostCard.module.scss';
import BookmarkToggleBtn from '../BookmarkToggleBtn/BookmarkToggleBtn';
import useAuthContext from 'src/hooks/useAuthContext';
const PostCard = ({ post, className }) => {
	const truncate = (text) => {
		return text.substring(0, 175) + '...';
	};
	const { user } = useAuthContext();
	return (
		<div key={post._id} className={`${styles.post} + ${className}`}>
			<Link to={`/posts/${post._id}`} className={styles.img}>
				<img src={post.img.url} alt="" />
			</Link>
			<p className={styles.date}>{format(new Date(post.createdAt), 'PPPP')}</p>
			<Link className={styles.titleContainer} to={`/posts/${post._id}`}>
				<h3 className={styles.title}>{post.title}</h3>

				<RiArrowRightUpLine className={styles.arrowIcon} size={24} />
			</Link>
			<div
				className={styles.body}
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(truncate(post.body.split('.')[0])),
				}}
			/>
			<div className={styles.footer}>
				<div className={styles.tags}>
					{post.tags.map((tag) => (
						<Tag key={post._id + tag} tag={tag} />
					))}
				</div>
				{user && <BookmarkToggleBtn post={post} />}
			</div>
		</div>
	);
};

PostCard.propTypes = {
	className: propTypes.string,
	post: propTypes.shape({
		_id: propTypes.string,
		title: propTypes.string,
		body: propTypes.string,
		createdAt: propTypes.string,
		tags: propTypes.array,
		img: propTypes.shape({
			url: propTypes.string,
		}),
	}),
};

export default PostCard;
