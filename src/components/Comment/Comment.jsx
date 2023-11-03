import { formatDistance } from 'date-fns';
import propTypes from 'prop-types';
import styles from './Comment.module.scss';

const Comment = ({ comment }) => {
	return (
		<>
			<div key={comment._id} className={styles.comment}>
				<div className={styles.header}>
					<p className={styles.author}>@ {comment.author.username}</p>
					<p className={styles.date}>
						{formatDistance(new Date(comment.createdAt), new Date())}
					</p>
				</div>
				<p className={styles.body}>{comment.body}</p>
				<div className={styles.footer}></div>
			</div>
			<hr />
		</>
	);
};

Comment.propTypes = {
	comment: propTypes.shape({
		_id: propTypes.string,
		author: propTypes.shape({
			username: propTypes.string,
		}),
		body: propTypes.string,
		createdAt: propTypes.string,
	}),
};

export default Comment;
