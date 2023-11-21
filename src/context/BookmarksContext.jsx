import { createContext, useReducer } from 'react';
import propTypes from 'prop-types';

const BookmarksContext = createContext(null);

const authReducer = (state, action) => {
	switch (action.type) {
		case 'SET_BOOKMARKS':
			return {
				bookmarks: action.payload,
			};
		case 'ADD_BOOKMARK':
			return { bookmarks: [action.payload, ...state.bookmarks] };
		case 'DELETE_BOOKMARK':
			return {
				bookmarks: state.bookmarks.filter(
					(bookmark) => bookmark._id !== action.payload._id
				),
			};
		default:
			return state;
	}
};

const BookmarksContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer);

	return (
		<BookmarksContext.Provider value={{ ...state, dispatch }}>
			{children}
		</BookmarksContext.Provider>
	);
};

BookmarksContextProvider.propTypes = {
	children: propTypes.element,
};

export { BookmarksContextProvider, BookmarksContext };
