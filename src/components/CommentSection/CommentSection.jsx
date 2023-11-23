import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import propTypes from 'prop-types';
import Comment from 'src/components/Comment/Comment';
import CommentForm from 'src/components/CommentForm/CommentForm';
import useAuthContext from 'src/hooks/useAuthContext';
import styles from './CommentSection.module.scss';
import Pagination from 'src/components/Pagination/Pagination';
import QueryControls from 'src/components/QueryControls/QueryControls';

const CommentSection = ({ post }) => {
	const [comments, setComments] = useState(null);
	const { user } = useAuthContext();
	const { id } = useParams();

	const [sort, setSort] = useState(1);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

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
			<QueryControls
				page={page}
				setPage={setPage}
				pageSize={pageSize}
				setPageSize={setPageSize}
				sort={sort}
				setSort={setSort}
				totalCount={totalCount}
				collectionName="Comments"
			/>
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
