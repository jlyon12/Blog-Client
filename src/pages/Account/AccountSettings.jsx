import { useState } from 'react';
import DeleteAccountForm from 'src/components/DeleteAccountForm/DeleteAccountForm';
import styles from './AccountSettings.module.scss';
const AccountSettings = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	return (
		<section className={styles.section}>
			<div className={styles.deleteGroup}>
				{isDeleting ? (
					<>
						<DeleteAccountForm />
						<button className={styles.btn} onClick={() => setIsDeleting(false)}>
							Cancel
						</button>
					</>
				) : (
					<>
						<p>Delete Account</p>
						<button className={styles.btn} onClick={() => setIsDeleting(true)}>
							Delete
						</button>
					</>
				)}
			</div>
		</section>
	);
};

export default AccountSettings;
