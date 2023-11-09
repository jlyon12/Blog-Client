import { Link } from 'react-router-dom';
import { RiArrowRightUpLine } from 'react-icons/ri';
import DOMPurify from 'dompurify';
import propTypes from 'prop-types';
import { format } from 'date-fns';
import Tag from 'src/components/Tag/Tag';
import styles from './PostCard.module.scss';
const PostCard = ({ post }) => {
	const truncate = (text) => {
		return text.substring(0, 175) + '...';
	};
	return (
		<div key={post._id} className={styles.post}>
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
				{post.tags.map((tag) => (
					<Tag key={post._id + tag} tag={tag} />
				))}
			</div>
		</div>
	);
};

PostCard.propTypes = {
	post: propTypes.shape({
		_id: propTypes.string,
		title: propTypes.string,
		body: propTypes.string,
		createdAt: propTypes.string,
		tags: propTypes.array,
	}),
};

export default PostCard;
