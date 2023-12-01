import { formatDistance } from 'date-fns';
import propTypes from 'prop-types';
import styles from './PrivateComment.module.scss';
import { Link } from 'react-router-dom';
import useAuthContext from 'src/hooks/useAuthContext';
import useConfirm from 'src/hooks/useConfirm';

const PrivateComment = ({ comment, setComments }) => {
	const { user } = useAuthContext();
	const { isConfirmed } = useConfirm();
	const deleteComment = async (comment) => {
		const confirmed = await isConfirmed(
			'Delete Comment? This action can not be undone.'
		);
		if (confirmed) {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${
					user.id
				}/comments/${comment._id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			const json = await res.json();
			if (res.ok) {
				setComments((prev) =>
					prev.filter((comment) => comment._id !== json.data._id)
				);
			}
		}
	};

	return (
		<>
			<div key={comment._id} className={styles.comment}>
				<div className={styles.header}>
					<p className={styles.date}>
						{formatDistance(new Date(comment.createdAt), new Date())}
					</p>
				</div>
				<p className={styles.body}>{comment.body}</p>
				<div className={styles.footer}>
					<Link className={styles.link} to={`/posts/${comment.post._id}`}>
						{comment.post.title}
					</Link>
				</div>
			</div>
			<button onClick={() => deleteComment(comment)} className={styles.btn}>
				Delete
			</button>

			<hr />
		</>
	);
};

PrivateComment.propTypes = {
	comment: propTypes.shape({
		_id: propTypes.string,
		post: propTypes.shape({
			title: propTypes.string,
			_id: propTypes.string,
		}),
		body: propTypes.string,
		createdAt: propTypes.string,
	}),
	setComments: propTypes.func,
};

export default PrivateComment;
