import { useContext } from 'react';
import { BookmarksContext } from 'src/context/BookmarksContext';

const useBookmarksContext = () => {
	const context = useContext(BookmarksContext);

	if (!context)
		throw Error(
			'BookmarksContext must be used inside of an BookmarksContextProvider'
		);

	return context;
};

export default useBookmarksContext;
