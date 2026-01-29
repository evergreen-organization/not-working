import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';

import {
	addReadingList,
	deleteReadingList,
	getLibrary,
	getReadingList,
	updateReadingList,
} from 'stores';
import { showFailure, showSuccess } from 'utils';

import {
	ADD_ERROR,
	ADD_SUCCESS,
	DELETE_ERROR,
	DELETE_SUCCESS,
	MARK_ERROR,
	MARK_SUCCESS,
} from '../utils';
import { ReadingGoalsView } from './component';
import { LOADING } from 'constant';

const currentYear = Moment().format('YYYY');

export const ReadingGoals = () => {
	const dispatch = useDispatch();
	const { readingList, goals, loadingGoals } = useSelector(getLibrary);
	const [showModal, setShowModal] = useState(false);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');

	useEffect(() => {
		dispatch(getReadingList({ year: currentYear }));
	}, []);

	const handleSubmitReadingList = async () => {
		setShowModal(false);
		const { payload } = await dispatch(
			addReadingList({
				title: title,
				author: author,
				year: currentYear,
				readingStatus: false,
			}),
		);

		if (payload.problem) {
			return showFailure(ADD_ERROR);
		}

		showSuccess(ADD_SUCCESS);
		setTitle('');
		setAuthor('');
		await dispatch(getReadingList({ year: currentYear }));
	};

	const handleDeleteReadingList = async (id) => {
		const { payload } = await dispatch(deleteReadingList({ id: id }));

		if (payload.problem) {
			return showFailure(DELETE_ERROR);
		}

		showSuccess(DELETE_SUCCESS);
		await dispatch(getReadingList({ year: currentYear }));
	};

	const handleUpdateReadingStatus = async ({ id, readingStatus, bookTitle }) => {
		const { payload } = await dispatch(
			updateReadingList({
				id,
				readingStatus: !readingStatus,
				title: bookTitle,
			}),
		);

		if (payload.problem) {
			showFailure(MARK_ERROR);
		}

		showSuccess(MARK_SUCCESS);
		await dispatch(getReadingList({ year: currentYear }));
	};

	const handleOpenModal = (_) => setShowModal(true);
	const handleCloseModal = (_) => setShowModal(false);
	const handleChangeTitleText = (text) => setTitle(text);
	const handleChangeAuthorText = (text) => setAuthor(text);

	const props = {
		handleOpenModal,
		handleCloseModal,
		handleUpdateReadingStatus,
		handleDeleteReadingList,
		handleSubmitReadingList,
		handleChangeTitleText,
		handleChangeAuthorText,
		readingList,
		goals,
		title,
		author,
		loadingGoals: loadingGoals === LOADING,
		showModal,
	};

	return <ReadingGoalsView {...props} />;
};
