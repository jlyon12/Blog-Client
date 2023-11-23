import Switch from 'src/components/Switch/Switch';
import styles from './QueryControls.module.scss';
import propTypes from 'prop-types';

const QueryControls = ({
	setPage,
	setPageSize,
	sort,
	setSort,
	totalCount,
	collectionName,
}) => {
	const handleLimitChange = (e) => {
		setPageSize(e.target.value);
		setPage(1);
	};

	const handleSortChange = () => {
		setSort((prev) => (prev === 1 ? -1 : 1));
		setPage(1);
	};

	return (
		<div className={styles.querySelectors}>
			<p className={styles.total}>
				{totalCount} Total {collectionName}
			</p>
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
	);
};

QueryControls.propTypes = {
	setPage: propTypes.func,
	setPageSize: propTypes.func,
	sort: propTypes.number,
	setSort: propTypes.func,
	totalCount: propTypes.number,
	collectionName: propTypes.string,
};

export default QueryControls;
