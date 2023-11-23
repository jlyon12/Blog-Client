import { useEffect, useState } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import useBookmarksContext from 'src/hooks/useBookmarksContext';
import PostCard from 'src/components/PostCard/PostCard';
import Pagination from 'src/components/Pagination/Pagination';
import QueryControls from 'src/components/QueryControls/QueryControls';
import styles from './AccountBookmarks.module.scss';

const AccountBookmarks = () => {
	const { bookmarks, dispatch } = useBookmarksContext();
	const { user } = useAuthContext();

	const [sort, setSort] = useState(-1);
	const [totalCount, setTotalCount] = useState();
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		const fetchUserBookmarks = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${
					user.id
				}/bookmarks?sort=${sort}&pageSize=${pageSize}&page=${page}`,
				{
					headers: { Authorization: `Bearer ${user.token}` },
				}
			);

			const json = await res.json();
			console.log(json);
			if (res.ok) {
				dispatch({ type: 'SET_BOOKMARKS', payload: json.data });
				setTotalCount(json.metadata.totalCount);
			}
		};

		fetchUserBookmarks();
	}, [dispatch, page, pageSize, sort, user]);

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
				collectionName="Bookmarks"
			/>
			<section className={styles.bookmarks}>
				{bookmarks &&
					bookmarks.map((bookmark) => (
						<PostCard post={bookmark} key={bookmark._id} />
					))}
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

export default AccountBookmarks;
