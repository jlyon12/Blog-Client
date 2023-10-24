import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<ul className={styles.listContainer}>
				<Link className={styles.link}>Twitter</Link>
				<Link className={styles.link}>LinkedIn</Link>
				<Link className={styles.link}>Email</Link>
				<Link className={styles.link}>RSS Feed</Link>
				<Link className={styles.link}>Add to Feedly</Link>
			</ul>
			<p>© 2023</p>
		</footer>
	);
};

export default Footer;
