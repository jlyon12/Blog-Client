import { useEffect, useState } from 'react';
import useAuthContext from 'src/hooks/useAuthContext';
import useBookmarksContext from 'src/hooks/useBookmarksContext';
import PostCard from 'src/components/PostCard/PostCard';
import Pagination from 'src/components/Pagination/Pagination';
import styles from './AccountBookmarks.module.scss';
import Switch from 'src/components/Switch/Switch';
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

	const handleLimitChange = (e) => {
		setPageSize(e.target.value);
		setPage(1);
	};

	const handleSortChange = () => {
		setSort((prev) => (prev === 1 ? -1 : 1));
		setPage(1);
	};
	return (
		<>
			<div className={styles.querySelectors}>
				<p className={styles.total}>{totalCount} Total Bookmarks</p>
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
						isOn={sort === -1}
						handleToggle={handleSortChange}
					/>
				</div>
			</div>
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
