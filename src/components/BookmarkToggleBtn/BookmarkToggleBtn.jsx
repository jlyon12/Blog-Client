import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import useAuthContext from 'src/hooks/useAuthContext';
import propTypes from 'prop-types';
import styles from './BookmarkToggleBtn.module.scss';

const BookmarkToggleBtn = ({ userBookmarks, setUserBookmarks, post }) => {
	const { user } = useAuthContext();
	const addBookmark = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${user.id}/bookmarks`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ postId: post._id }),
			}
		);
		const json = await res.json();
		if (res.ok) {
			setUserBookmarks([...userBookmarks, json.data]);
		}
	};
	const deleteBookmark = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${user.id}/bookmarks`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ postId: post._id }),
			}
		);
		const json = await res.json();
		if (res.ok) {
			setUserBookmarks(
				userBookmarks.filter((bookmark) => bookmark._id !== json.data._id)
			);
		}
	};
	return (
		<div className={styles.bookmarkContainer}>
			{userBookmarks.some((bookmark) => bookmark._id === post._id) ? (
				<button onClick={deleteBookmark} className={styles.bookmarkIcon}>
					<FaBookmark size={32} />
				</button>
			) : (
				<button onClick={addBookmark} className={styles.bookmarkIcon}>
					<FaRegBookmark size={32} />
				</button>
			)}
		</div>
	);
};
BookmarkToggleBtn.propTypes = {
	userBookmarks: propTypes.array,
	setUserBookmarks: propTypes.func,
	post: propTypes.shape({
		_id: propTypes.string,
	}),
};
export default BookmarkToggleBtn;
