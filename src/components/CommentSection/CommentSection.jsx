import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Comment from 'src/components/Comment/Comment';
import CommentForm from 'src/components/CommentForm/CommentForm';
import Switch from 'src/components/Switch/Switch';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './CommentSection.module.scss';

const CommentSection = ({ post }) => {
	const [comments, setComments] = useState(null);
	const { user } = useAuthContext();
	const { id } = useParams();
	const [limit, setLimit] = useState(5);
	const [skip, setSkip] = useState(0);
	const [sort, setSort] = useState(1);
	const handleLimitChange = (e) => {
		setLimit(e.target.value);
	};

	const handleSkipDecrease = () => {
		if (skip <= 0) {
			return;
		} else setSkip((prev) => prev - limit);
	};

	const handleSkipIncrease = () => {
		if (comments.length <= 1) {
			return;
		}

		setSkip((prev) => prev + limit);
	};

	const handleSortChange = () => {
		setSort((prev) => (prev === 1 ? -1 : 1));
		setSkip(0);
	};
	const fetchComments = useCallback(async () => {
		const res = await fetch(
			`${
				import.meta.env.VITE_API_CROSS_ORIGIN
			}/api/posts/${id}/comments?sort=${sort}&limit=${limit}&skip=${skip}`
		);

		const json = await res.json();
		if (res.ok) {
			setComments(json.data);
		}
	}, [id, limit, skip, sort]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments, id]);
	return (
		<div className={styles.commentSection}>
			<h3>Comments</h3>
			<div className={styles.querySelectors}>
				<label htmlFor="limit">
					Limit
					<select name="limit" id="limit" onChange={handleLimitChange}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="25">25</option>
						<option value="50">50</option>
					</select>
				</label>

				<div className={styles.toggleContainer}>
					<p>{sort === -1 ? 'By Recent' : 'By Oldest'}</p>
					<Switch
						label="sortToggle"
						isOn={sort === 1}
						handleToggle={handleSortChange}
					/>
				</div>
			</div>
			{comments &&
				comments.map((comment) => (
					<Comment key={comment._id} comment={comment} />
				))}
			<div className={styles.pageNavigation}>
				{skip > 0 && <button onClick={handleSkipDecrease}>Prev</button>}
				<button className={styles.nextBtn} onClick={handleSkipIncrease}>
					Next
				</button>
			</div>
			{user ? (
				<CommentForm postId={post._id} fetchComments={fetchComments} />
			) : (
				<p className={styles.noUser}>
					Please <Link to="/login">Log In</Link> to leave a comment
				</p>
			)}
		</div>
	);
};

CommentSection.propTypes = {
	post: propTypes.shape({
		_id: propTypes.string,
	}),
};
export default CommentSection;
