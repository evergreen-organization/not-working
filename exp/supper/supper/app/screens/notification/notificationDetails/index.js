import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Linking } from 'react-native';

import { fetchAttachmentStatus, fetchNotificationDetails, getNotification } from 'stores';
import { fetchPDF } from 'apis';
import { routes } from 'navigations';
import { LOADING } from 'constant';

import { NotificationDetailsView } from './component';

const LEADGEN_TITLE = 'LeadGen 360';

export const NotificationDetails = ({ navigation }) => {
	const dispatch = useDispatch();
	const { pushNotification, notificationDetails, status } = useSelector(getNotification);
	const { contentId } = pushNotification;
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [source, setSource] = useState({ uri: '' });
	const [isLeadGen, setIsLeadGen] = useState(false);

	useEffect(() => {
		(async () => await loadNotificationDetails())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setIsLeadGen(notificationDetails.title === LEADGEN_TITLE);
	}, [notificationDetails]);
	const loadNotificationDetails = async () => dispatch(fetchNotificationDetails({ contentId }));

	const handleOpenPdfModal = async (attachment) => {
		setIsModalVisible(true);
		const response = await fetchPDF(attachment[0].url);
		if (response) {
			setSource({
				uri: 'data:application/pdf;base64,' + response.data,
				cache: true,
			});
		}
		if (attachment[0].readStatus) {
			return;
		}
		await acknowledgementAlert(attachment[0].mappingId);
	};

	const handleAcknowledgement = async (mappingId) => {
		const { payload } = await dispatch(fetchAttachmentStatus({ mappingId }));
		if (!payload.data) {
			return;
		}
	};
	const acknowledgementAlert = async (mappingId) => {
		return Alert.alert(
			'Acknowledgement',
			'By clicking this, you have acknowledged that you have read and understood the circular and will comply with the provisions accordingly.',
			[
				{
					text: 'Acknowledge',
					onPress: await handleAcknowledgement(mappingId),
				},
			],
		);
	};

	const handleClosePdfModal = () => {
		setSource({ uri: '' });
		setIsModalVisible(false);
	};

	const handleLeadGenDetailPress = () => navigation.navigate(routes.LG360_SUMMARY_STATUS);

	const handleOpenUrl = (url) => Linking.openURL(url);

	const handleBack = () => navigation.goBack();

	const props = {
		handleOpenUrl,
		handleLeadGenDetailPress,
		handleClosePdfModal,
		handleOpenPdfModal,
		handleBack,
		isModalVisible,
		source,
		isLeadGen,
		notificationDetails,
		loading: status === LOADING,
	};

	return <NotificationDetailsView {...props} />;
};
