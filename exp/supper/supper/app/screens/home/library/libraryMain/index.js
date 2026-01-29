import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Linking } from 'react-native';
import Moment from 'moment';

import { getBooks, getLibrary, getPublications, getReadingList } from 'stores';
import { routes } from 'navigations';
import { showFailure } from 'utils';
import { LOADING } from 'constant';

import { eBookCentralURL, filterBooks } from '../utils';
import { LibraryMainView } from './component';

export const LibraryMain = ({ navigation }) => {
	const dispatch = useDispatch();
	const { goals, books, loadingBooks, loadingGoals } = useSelector(getLibrary);
	const [showSearchResultModal, setShowSearchResultModal] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [searchInput, setSearchInput] = useState('');

	const currentYear = Moment().format('YYYY');

	useEffect(() => {
		(async () => {
			await getAllBooks();
			await getAllPublications();
			await getAllReadingLists();
		})();
	}, []);

	const getAllBooks = async () => {
		const { payload } = await dispatch(getBooks());
		if (payload.problem) {
			return showFailure('Books: ' + payload.problem);
		}
	};

	const getAllPublications = async () => {
		const { payload } = await dispatch(getPublications());
		if (payload.problem) {
			return showFailure('ePublications: ' + payload.problem);
		}
	};

	const getAllReadingLists = async () => {
		const { payload } = await dispatch(getReadingList({ year: currentYear }));
		if (payload.problem) {
			return showFailure('Goals:' + payload.problem);
		}
	};

	const searchBooks = () => {
		if (searchInput !== '') {
			setShowSearchResultModal(true);
			setSearchResults(filterBooks(books, searchInput));
		}
	};

	const handleChangeText = (text) => setSearchInput(text);
	const handlePressSearch = (_) => searchBooks();
	const handlePressClear = (_) => setSearchInput('');
	const handleSearchModalClose = (_) => setShowSearchResultModal(false);
	const handleReadingGoalPress = (_) => navigation.navigate(routes.READING_GOALS);

	const handleNavigation = (title) => navigation.navigate(routes.LIBRARY_LIST, { title });

	const handleEbooksPress = () => Linking.openURL(eBookCentralURL);

	const props = {
		handleChangeText,
		handlePressSearch,
		handlePressClear,
		handleSearchModalClose,
		handleReadingGoalPress,
		handleNavigation,
		handleEbooksPress,
		searchInput,
		showSearchResultModal,
		searchResults,
		goals,
		books,
		loadingBooks: loadingBooks === LOADING,
		loadingGoals: loadingGoals === LOADING,
	};

	return <LibraryMainView {...props} />;
};
