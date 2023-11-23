import { useEffect, useState } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import PrivateComment from 'src/components/PrivateComment/PrivateComment';
import Pagination from 'src/components/Pagination/Pagination';
import QueryControls from 'src/components/QueryControls/QueryControls';
import styles from './AccountComments.module.scss';

const AccountComments = () => {
	const [comments, setComments] = useState();
	const { user } = useAuthContext();

	const [sort, setSort] = useState(-1);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		const fetchUserComments = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${
					user.id
				}/comments?sort=${sort}&pageSize=${pageSize}&page=${page}`,
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);

			const json = await res.json();

			if (res.ok) {
				setComments(json.data);
				setTotalCount(json.metadata.totalCount);
			}
		};

		fetchUserComments();
	}, [page, pageSize, sort, user]);

	return (
		<>
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
			<section className={styles.comments}>
				{comments && comments.length > 0 ? (
					comments.map((comment) => (
						<PrivateComment
							key={comment._id}
							comment={comment}
							setComments={setComments}
						/>
					))
				) : (
					<p className={styles.noComments}>You do not have any comments!</p>
				)}
			</section>

			<Pagination
				page={page}
				setPage={setPage}
				totalCount={Number(totalCount)}
				pageSize={Number(pageSize)}
			/>
		</>
	);
};

export default AccountComments;
