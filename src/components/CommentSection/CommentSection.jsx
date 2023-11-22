import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Comment from 'src/components/Comment/Comment';
import CommentForm from 'src/components/CommentForm/CommentForm';
import Switch from 'src/components/Switch/Switch';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './CommentSection.module.scss';
import Pagination from '../Pagination/Pagination';
const CommentSection = ({ post }) => {
	const [comments, setComments] = useState(null);
	const { user } = useAuthContext();
	const { id } = useParams();
	const [sort, setSort] = useState(1);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const handleLimitChange = (e) => {
		setPageSize(e.target.value);
		setPage(1);
	};

	const handleSortChange = () => {
		setSort((prev) => (prev === 1 ? -1 : 1));
		setPage(1);
	};
	const fetchComments = useCallback(async () => {
		const res = await fetch(
			`${
				import.meta.env.VITE_API_CROSS_ORIGIN
			}/api/posts/${id}/comments?sort=${sort}&pageSize=${pageSize}&page=${page}`
		);

		const json = await res.json();
		if (res.ok) {
			setComments(json.data);
			setTotalCount(json.metadata.totalCount);
		}
	}, [id, page, pageSize, sort]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments, id]);

	return (
		<div className={styles.commentSection}>
			<h3>Comments</h3>
			<div className={styles.querySelectors}>
				<p className={styles.total}>{totalCount} Total Comments</p>
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
			{totalCount > pageSize && (
				<Pagination
					page={page}
					setPage={setPage}
					totalCount={Number(totalCount)}
					pageSize={Number(pageSize)}
				/>
			)}
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
