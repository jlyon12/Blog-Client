import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostCard from 'src/components/PostCard/PostCard';

import styles from './PostsByTag.module.scss';
const PostsByTag = () => {
	const [postsByTag, setPostsByTag] = useState(null);
	const { tag } = useParams();
	const tagFilter = tag.replace('-', ' ');

	useEffect(() => {
		const fetchPostsByTag = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/posts/?tag=${tagFilter}/`
			);

			const json = await res.json();

			if (res.ok) {
				setPostsByTag(json.data);
			}
		};

		fetchPostsByTag();
	}, [tagFilter]);
	return (
		<main className={styles.main}>
			<section>
				<h2 className={styles.sectionTitle}>Posts in {tagFilter}</h2>
				<div className={styles.posts}>
					{postsByTag &&
						postsByTag.map((post) => <PostCard key={post._id} post={post} />)}
				</div>
			</section>
		</main>
	);
};

export default PostsByTag;
