import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import useSignup from 'src/hooks/useSignup';
import styles from './Signup.module.scss';
const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const { isLoading, error, signup } = useSignup();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const { firstName, lastName, username, email, password, passwordConfirm } =
			formData;
		signup(firstName, lastName, username, email, password, passwordConfirm);
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<legend>Signup</legend>
				<fieldset>
					<label className={styles.formControl} htmlFor="firstName">
						<input
							required
							type="text"
							placeholder="First Name"
							value={formData.firstName}
							onChange={handleChange}
							name="firstName"
							id="firstName"
						/>
					</label>
					<label className={styles.formControl} htmlFor="lastName">
						<input
							required
							type="text"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={handleChange}
							name="lastName"
							id="lastName"
						/>
					</label>
					<label className={styles.formControl} htmlFor="email">
						<input
							required
							type="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							name="email"
							id="email"
						/>
					</label>
					<label className={styles.formControl} htmlFor="username">
						<input
							required
							type="text"
							placeholder="Username"
							value={formData.username}
							onChange={handleChange}
							name="username"
							id="username"
						/>
					</label>
					<label className={styles.formControl} htmlFor="password">
						<input
							required
							type="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							name="password"
							id="password"
						/>
					</label>
					<label className={styles.formControl} htmlFor="passwordConfirm">
						<input
							required
							type="password"
							placeholder="Confirm Password"
							value={formData.passwordConfirm}
							onChange={handleChange}
							name="passwordConfirm"
							id="passwordConfirm"
						/>
					</label>
				</fieldset>
				<button disabled={false} className={styles.btn}>
					Create Account
				</button>
				<BarLoader
					color="#6941c6"
					className={styles.spinner}
					loading={isLoading}
				/>
				{error &&
					error.map((error) => {
						return (
							<p key={error} className={styles.error}>
								{error.detail}
							</p>
						);
					})}
			</form>
		</main>
	);
};

export default Signup;
