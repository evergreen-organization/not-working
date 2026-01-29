import React from 'react';
import Moment from 'moment';

import { routes } from 'navigations';
import { NewNotificationView } from './component';

export const NewNotification = ({ navigation }) => {
	const initialValues = {
		company: '',
		category: '',
		title: '',
		body: '',
		description: '',
		validDuration: '',
	};

	const handleSubmit = ({
		company,
		category,
		title,
		body,
		description,
		validDuration,
	}) => {
		const formattedDate = Moment(validDuration).format('YYYY-MM-DD');
		navigation.navigate(routes.NEW_NOTIFICATION_PREVIEW, {
			company,
			category,
			title,
			body,
			description,
			validDuration: formattedDate,
		});
	};

	const handleBack = () => navigation.goBack();

	const prop = {
		handleBack,
		handleSubmit,
		initialValues,
	};

	return <NewNotificationView {...prop} />;
};
