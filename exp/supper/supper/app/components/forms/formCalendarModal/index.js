import React, { useState } from 'react';
import Moment from 'moment/moment';
import { useFormikContext } from 'formik';
import { colors } from 'configs';
import { FormCalendarModalView } from './component';

export const FormCalendarModal = ({
	name,
	minimumDate,
	maximumDate,
	disabled = false,
	label,
	mandatory = false,
	pastScrollRange = 50,
	futureScrollRange = 50,
	dateFormat = 'YYYY-MM-DD',
	onDayPress = () => {},
}) => {
	const { setFieldValue } = useFormikContext();
	const [isCalendarShow, setIsCalendarShow] = useState(false);
	const [selectedDate, setSelectedDate] = useState({});

	const handleDayPress = ({ dateString }) => {
		setFieldValue(name, Moment(dateString).toDate());
		setSelectedDate({
			[dateString]: { selected: true, selectedColor: colors.primary },
		});
		setIsCalendarShow(false);
		onDayPress(dateString);
	};

	const handleCloseModal = () => setIsCalendarShow(false);
	const handleShowModal = () => setIsCalendarShow(true);

	const props = {
		handleShowModal,
		handleCloseModal,
		handleDayPress,
		isCalendarShow,
		selectedDate,
		maximumDate,
		minimumDate,
		disabled,
		label,
		name,
		mandatory,
		pastScrollRange,
		futureScrollRange,
		dateFormat,
	};

	return <FormCalendarModalView {...props} />;
};
