import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';

import { routes } from 'navigations';
import { showFailure } from 'utils';
import { fetchSelfTestResults, getHistory } from 'stores';

import { SelfTestHistoryView } from './component';
import { initialBottom } from 'styles';

export const SelfTestHistory = ({ navigation }) => {
	const { showActionSheetWithOptions } = useActionSheet();
	const dispatch = useDispatch();
	const { status, list } = useSelector(getHistory);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		(async () => await retrieveHistory())();
	}, []);

	const retrieveHistory = async () => {
		const { payload } = await dispatch(fetchSelfTestResults());
		if (payload?.problem) {
			return showFailure(payload.problem);
		}
	};

	const handleHistoryPress = (item) => {
		navigation.navigate(routes.COVID_HISTORY_DETAIL, { item });
	};

	const handleNavigation = () => {
		user.gradeCode <= 500010
			? handleActionSheet()
			: navigation.navigate(routes.COVID_UPLOAD_RESULT);
	};

	const handleActionSheet = () => {
		showActionSheetWithOptions(
			{
				title: '',
				options: ['Cancel', 'Upload', 'Administer'],
				cancelButtonIndex: 0,
				userInterfaceStyle: 'light',
				containerStyle: {
					paddingBottom: initialBottom,
				},
			},
			(index) => {
				if (index === 1) {
					navigation.navigate(routes.COVID_UPLOAD_RESULT);
				} else if (index === 2) {
					navigation.navigate(routes.COVID_APPROVE_RESULT);
				}
			},
		);
	};
	const props = {
		handleHistoryPress,
		handleNavigation,
		handleActionSheet,
		navigation,
		list,
		status,
	};

	return <SelfTestHistoryView {...props} />;
};
