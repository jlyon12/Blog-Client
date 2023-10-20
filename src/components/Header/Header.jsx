import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.navContainer}>
				<p>Your name</p>
				<nav>
					<ul>
						<li>
							<Link>Blog</Link>
						</li>
						<li>
							<Link>Project</Link>
						</li>
						<li>
							<Link>About</Link>
						</li>
						<li>
							<Link>Newsletter</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className={styles.heroContainer}>
				<h1>The Blog</h1>
			</div>
		</header>
	);
};

export default Header;
