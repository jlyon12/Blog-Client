import { useState } from 'react';
import propTypes from 'prop-types';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './CommentForm.module.scss';

const CommentForm = ({ postId, fetchComments }) => {
	const [comment, setComment] = useState('');
	const { user } = useAuthContext();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/${postId}/comments`,
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

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<fieldset>
				<label htmlFor="comment" className={styles.formControl}>
					<textarea
						name="comment"
						id="comment"
						placeholder="Leave a comment..."
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					></textarea>
				</label>
			</fieldset>

			<button className={styles.btn}>Add</button>
		</form>
	);
};

CommentForm.propTypes = {
	postId: propTypes.string,
	fetchComments: propTypes.func,
};

export default CommentForm;
