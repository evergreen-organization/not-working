import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { deleteTags, fetchTags, getEbizData, renewTags } from 'stores';

import { eBizErrorPrompt } from '../../utils/utils';

import { DynamicRequestListComp } from './component';
import { addAnalyticCheckpoint } from 'utils';
import { USER_ANALYTICS } from 'constant';
const SortedMethod = {
	alpha: 'alpha',
	date: 'date',
};

export const DynamicRequestList = ({ navigation }) => {
	const [searchInput, setSearchInput] = useState('');

	const [isPopUpVisible, setIsPopUpVisible] = useState(false);
	const dispatch = useDispatch();
	const { allTags } = useSelector(getEbizData);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [qrValue, setQRValue] = useState('placeholding');
	const [isQRVisible, setIsQRVisible] = useState(false);
	const [isApproveVisible, setIsApproveVisible] = useState(false);
	const [selectAllSelected, setSelectAllSelected] = useState({
		profileRenewal: false,
		dynamicTags: false,
	});
	const viewRef = useRef();
	useEffect(() => {
		(async () => {
			await dispatch(fetchTags());
		})();
	}, []);

	const [sortSelected, setSortSelected] = useState({
		profileRenewal: SortedMethod.alpha,
		dynamicTags: SortedMethod.alpha,
	});

	const [groupedData, setGroupedData] = useState([]);

	useEffect(() => {
		setGroupedData([
			{
				title: 'Profile Renewal Requests',
				key: 'profileRenewal',
				data: sortByAlphabet(allTags.filter((item) => item.isRequested)),
			},
			{
				title: 'All Dynamic eBiz Card Tags',
				key: 'dynamicTags',
				data: sortByAlphabet(allTags.filter((item) => !item.isRequested)),
			},
		]);
	}, [allTags]);

	const handleTextClear = (_) => setSearchInput('');

	const handleTextChange = (text) => setSearchInput(text);

	const handlePopUp = () => setIsPopUpVisible(!isPopUpVisible);

	const sortByAlphabet = (data) =>
		[...data].sort((a, b) => a.description.localeCompare(b.description));

	const sortByDateCreated = (data) =>
		[...data].sort((a, b) => moment(b.creationDate).diff(moment(a.creationDate)));

	const handleSortList = ({ data, key }) => {
		const sortedData =
			sortSelected[key] === SortedMethod.alpha ? sortByDateCreated(data) : sortByAlphabet(data);
		const arrayIndex = groupedData.findIndex((dt) => dt.key === key);
		const updateGroupData = [...groupedData];
		updateGroupData[arrayIndex].data = sortedData;
		setGroupedData(updateGroupData);
		toggleSortIcon(key);
	};

	const toggleSortIcon = (key) => {
		setSortSelected((sortSelected) => ({
			...sortSelected,
			[key]: sortSelected[key] === SortedMethod.alpha ? SortedMethod.date : SortedMethod.alpha,
		}));
	};

	const handleGoBack = () => navigation.goBack();
	const handleSelectAll = (data, key) => {
		if (selectAllSelected[key] === true) {
			if (data.every((item) => selectedItems.includes(item))) {
				setSelectedItems(selectedItems.filter((item) => !data.includes(item)));
			} else {
				setSelectedItems([...selectedItems, ...data]);
			}
			setSelectAllSelected((item) => ({ ...item, [key]: false }));
		} else {
			setSelectedItems([...selectedItems, ...data]);

			setSelectAllSelected((item) => ({ ...item, [key]: true }));
		}
	};

	function handleSelection(selection) {
		const found = selectedItems.find((item) => item.id === selection.id);
		if (found) {
			setSelectedItems(selectedItems.filter((item) => item.id !== selection.id));
			return;
		}

		setSelectedItems([...selectedItems, selection]);
	}

	const handleDelete = async () => {
		setIsLoading(true);
		const { payload } = await dispatch(deleteTags(selectedItems));
		setIsLoading(false);
		setIsPopUpVisible(!isPopUpVisible);

		if (!payload.ok) {
			return eBizErrorPrompt(payload);
		}

		setSelectedItems([]);
	};

	const handleRenew = async (e) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.DYNAMIC_REQUEST_LIST,
			buttonEvent: e.nativeEvent,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.RENEW_TAG,
		}).then();
		setIsLoading(true);
		const { payload } = await dispatch(renewTags(selectedItems));
		setIsLoading(false);
		setIsApproveVisible(!isApproveVisible);
		if (!payload?.ok) {
			return eBizErrorPrompt(payload);
		}

		setSelectedItems([]);
	};

	const handleGenerateQRCode = (e, item) => {
		addAnalyticCheckpoint({
			dispatch,
			module: USER_ANALYTICS.MODULES.EBIZCARD,
			view: viewRef,
			screen: USER_ANALYTICS.EBIZCARD_SCREENS.DYNAMIC_REQUEST_LIST,
			buttonEvent: e.nativeEvent,
			action: USER_ANALYTICS.EBIZCARD_ACTIONS.SHARE_DYNAMIC_EXISTING_TAG,
		}).then();

		setQRValue(item.url);
		setIsQRVisible(!isQRVisible);
	};
	const hanleClosePopUp = () => {
		setIsQRVisible(false);
	};

	const handleCloseApprove = () => {
		setIsApproveVisible(false);
	};
	const props = {
		searchInput,
		isLoading,
		isPopUpVisible,
		groupedData,
		selectedItems,
		sortSelected,
		qrValue,
		isQRVisible,
		handleTextChange,
		handleTextClear,
		handleSelectAll,
		handleSortList,
		handleSelection,
		handleRenew,
		handleDelete,
		handleGoBack,
		handlePopUp,
		setIsPopUpVisible,
		setIsQRVisible,
		handleGenerateQRCode,
		hanleClosePopUp,
		isApproveVisible,
		setIsApproveVisible,
		handleCloseApprove,
	};
	return <DynamicRequestListComp {...props} />;
};
