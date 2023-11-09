import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './Tag.module.scss';
const Tag = ({ tag }) => {
	const urlSafeTag = tag.replace(' ', '-');
	return (
		<Link to={`/tags/${urlSafeTag}`} className={styles.tag}>
			{tag}
		</Link>
	);
};

Tag.propTypes = {
	tag: propTypes.string,
};

export default Tag;
