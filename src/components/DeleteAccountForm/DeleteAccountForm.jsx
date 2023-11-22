import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import useAuthContext from 'src/hooks/useAuthContext';
import useLogout from 'src/hooks/useLogout';
import styles from './DeleteAccountForm.module.scss';
const DeleteAccountForm = () => {
	const { user } = useAuthContext();
	const { logout } = useLogout();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [password, setPassword] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/users/${user.id}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({ password }),
			}
		);
		const json = await res.json();
		if (!res.ok) {
			setIsLoading(false);
			setError(json.errors);
		}
		if (res.ok) {
			setIsLoading(false);
			logout();
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<legend>Delete</legend>
			<p>Deleting Account</p>
			<fieldset>
				<label className={styles.formControl} htmlFor="email">
					<input
						required
						type="password"
						placeholder="Confirm Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						name="password"
						id="password"
					/>
				</label>
			</fieldset>
			<button disabled={isLoading} className={styles.btnDanger}>
				Delete
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
	);
};

export default DeleteAccountForm;
