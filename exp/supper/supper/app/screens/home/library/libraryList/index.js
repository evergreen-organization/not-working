import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { generatePDFUri } from 'apis';
import { getLibrary } from 'stores';

import { LibraryListView } from './component';
import { filterBooksByGenre, getRecommendedBooks, searchBookText, sortBooksByDate } from '../utils';

export const LibraryList = ({ route }) => {
	const { books, epublications } = useSelector(getLibrary);
	const [bookList, setBookList] = useState([]);

	const sortedBookList = sortBooksByDate(bookList);
	const [booksVisible, setBooksVisible] = useState(sortedBookList);

	const [searchInput, setSearchInput] = useState('');
	const [selectedPDF, setSelectedPDF] = useState({ uri: '' });
	const [showPDFModal, setShowPDFModal] = useState(false);

	const title = route.params.title;
	const recommended = getRecommendedBooks(books);
	const bookVariants = {
		['e-Publications']: epublications,
		['Recommended']: recommended,
		['e-Books']: books,
	};

	useEffect(() => {
		let tempBookList = bookVariants[title];

		if (tempBookList === undefined) {
			let filteredBookList = filterBooksByGenre({
				bookList: [...books, ...epublications],
				title,
			});
			setInitialBookList(filteredBookList);
		} else {
			setInitialBookList(tempBookList);
		}
	}, []);

	const setInitialBookList = (initialBookList) => {
		setBookList(initialBookList);
		setBooksVisible(initialBookList);
	};

	const handleShowPDF = async (url) => {
		setShowPDFModal(true);
		const pdfUri = await generatePDFUri(url);
		setSelectedPDF(pdfUri);
	};

	const handleChangeText = (text) => {
		setSearchInput(text);
		if (!text) {
			setBooksVisible(sortedBookList);
		} else {
			setBooksVisible(searchBookText(sortedBookList, text));
		}
	};

	const handlePressClear = () => {
		setSearchInput('');
		setBooksVisible(sortedBookList);
	};

	const handleCloseModal = () => {
		setSelectedPDF({ uri: '' });
		setShowPDFModal(false);
	};

	const props = {
		handleChangeText,
		handlePressClear,
		handleShowPDF,
		handleCloseModal,
		showPDFModal,
		booksVisible,
		title,
		searchInput,
		selectedPDF,
	};
	return <LibraryListView {...props} />;
};
