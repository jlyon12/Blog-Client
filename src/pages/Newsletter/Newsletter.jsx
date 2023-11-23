import NewsLetterForm from 'src/components/NewsLetterForm/NewsLetterForm';
import styles from './Newsletter.module.scss';
const NewsLetter = () => {
	return (
		<main className={styles.main}>
			<NewsLetterForm />
		</main>
	);
};

export default NewsLetter;
