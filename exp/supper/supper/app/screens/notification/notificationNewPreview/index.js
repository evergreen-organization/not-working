import React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { createNotification, getNotification, pushNotification } from 'stores';
import { routes } from 'navigations';
import { showFailure, showSuccess } from 'utils';
import { LOADING } from 'constant';

import {
	NOTIFICATION_CATEGORY_IMAGE,
	NOTIFICATION_CATEGORY_LIST,
	NOTIFICATION_COMPANIES,
} from '../constant';
import { NotificationNewPreviewView } from './component';

export const NotificationNewPreview = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const {
		company: companyCode,
		category: categoryId,
		title,
		body,
		description,
		validDuration,
	} = route.params;
	const { status } = useSelector(getNotification);
	const categoryName = NOTIFICATION_CATEGORY_LIST.find(
		(item) => item.id === categoryId,
	)?.name;

	const handleCreateNotification = async () => {
		const { payload } = await dispatch(
			createNotification({
				categoryId,
				title,
				body,
				description,
				validDuration,
			}),
		);

		if (payload.problem) {
			return showFailure('Error', 'Unsuccessful! Please try again.');
		}

		return payload.data.contentId;
	};

	const handlePushNotification = async (contentId) => {
		const { payload } = await dispatch(
			pushNotification({
				contentId,
				group: { companyCode },
			}),
		);

		if (payload.problem) {
			return showFailure('Error', 'Unsuccessful! Please try again.');
		}
		showSuccess('Success', 'Notification successfully created and sent!');
		navigation.navigate(routes.NOTIFICATION);
	};

	const confirmationAlert = (title, onPress) => {
		return Alert.alert(
			'Confirmation',
			`Are you sure you want to ${title} the notification?`,
			[{ text: 'No' }, { text: 'Yes', onPress: onPress }],
			{ cancelable: false },
		);
	};

	const handleDiscardCreateNewNotification = () => {
		confirmationAlert('discard', () =>
			navigation.navigate(routes.NOTIFICATION),
		);
	};

	const handleSendNotification = async () => {
		confirmationAlert('send', async () => {
			const contentId = await handleCreateNotification();
			if (contentId) {
				await handlePushNotification(contentId);
			}
		});
	};

	const handleBack = () => navigation.goBack();

	const props = {
		handleBack,
		handleSendNotification,
		handleDiscardCreateNewNotification,
		categoryImage: NOTIFICATION_CATEGORY_IMAGE[categoryId],
		companyName: NOTIFICATION_COMPANIES[companyCode].name,
		loading: status === LOADING,
		categoryName,
		validDuration,
		title,
		description,
		body,
	};

	return <NotificationNewPreviewView {...props} />;
};
