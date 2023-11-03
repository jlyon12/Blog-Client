import styles from './NewsLetterForm.module.scss';
import { useState } from 'react';
const NewsLetterForm = () => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsSubmitted(true);
	};

	return (
		<div className={styles.ctaContainer}>
			<h4 className={styles.subHeading}>Newsletter</h4>
			<h3 className={styles.heading}>Stories and Interviews</h3>
			<p className={styles.subText}>
				Subscribe to learn about new product features, the latest in technology,
				solutions, and updates.
			</p>
			<form className={styles.form} onSubmit={handleSubmit}>
				<fieldset>
					<label htmlFor="email" className={styles.formControl}>
						<input
							type="email"
							value={email}
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							name="email"
							id="email"
						/>
					</label>
				</fieldset>
				<p className={styles.privacyText}>
					We care about your data in our <a href="#">privacy policy</a>
				</p>
				<button disabled={isSubmitted} className={styles.btn}>
					{isSubmitted ? 'Success' : 'Subscribe'}
				</button>
			</form>
		</div>
	);
};

export default NewsLetterForm;
