import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import useLogin from 'src/hooks/useLogin';
import styles from './Login.module.scss';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLoading, error, login } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(email, password);
	};

	return (
		<main className={styles.main}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<legend>Login</legend>
				<fieldset>
					<label className={styles.formControl} htmlFor="email">
						<input
							required
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							name="email"
							id="email"
						/>
					</label>
					<label className={styles.formControl} htmlFor="password">
						<input
							required
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							name="password"
							id="password"
						/>
					</label>
				</fieldset>
				<button disabled={isLoading} className={styles.btn}>
					Log In
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
			<p className={styles.signup}>
				Dont have an account? <Link to="/signup">Signup</Link>
			</p>
		</main>
	);
};

export default Login;
