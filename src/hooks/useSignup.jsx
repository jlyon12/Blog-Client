import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuthContext from 'src/hooks/useAuthContext';

const useSignup = () => {
	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();

	const signup = async (
		firstName,
		lastName,
		username,
		email,
		password,
		passwordConfirm
	) => {
		setIsLoading(true);
		setError(null);

		if (password !== passwordConfirm) {
			setIsLoading(false);
			setError('Passwords do not match');
			return;
		}

		const res = await fetch(
			`${import.meta.env.VITE_API_CROSS_ORIGIN}/api/user/signup`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					first_name: firstName,
					last_name: lastName,
					username,
					email,
					password,
				}),
			}
		);

		const json = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(json.err);
		}

		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(json));

			dispatch({ type: 'LOGIN', payload: json });
			setIsLoading(false);
			navigate('/');
		}
	};

	return { isLoading, error, signup };
};

export default useSignup;
