import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { colors } from 'configs';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useFormikContext } from 'formik';
import { Text, TextHelper } from 'atoms';
import { FormDateTimePickerType } from '../waterTracker.type';

const dateTimeFormat = 'YYYY-MM-DD HH:mm';
const timeFormat = 'hh:mm A';

export const FormDateTimePicker = ({ name, title, image, defaultTime }: FormDateTimePickerType) => {
	const { setFieldValue, values, touched, errors } = useFormikContext();
	const [dateTimePicker, setDateTimePicker] = useState(false);
	const [time, setTime] = useState(
		values[name] !== null
			? Moment(values[name], dateTimeFormat).toDate()
			: Moment().hours(defaultTime).minutes(0).seconds(0).milliseconds(0).toDate(),
	);

	const handleTimeConfirm = (date) => {
		let selectedTime = Moment(date).format(dateTimeFormat);
		setFieldValue(name, selectedTime);
		setDateTimePicker(false);
	};

	const handleOnCloseModal = () => setDateTimePicker(false);

	const handleOnOpenModal = () => setDateTimePicker(true);

	return (
		<>
			<View style={styles.container}>
				<Image source={image} style={styles.icon} />
				<View style={styles.buttonContainer}>
					<Text style={styles.inputLabel}>{title}</Text>
					<TouchableOpacity style={styles.inputContainer} onPress={handleOnOpenModal}>
						<Text style={styles.text}>
							{values[name] === null
								? 'Please Select'
								: Moment(values[name], dateTimeFormat).format(timeFormat)}
						</Text>
						<EvilIcons name="chevron-down" />
					</TouchableOpacity>
					{touched[name] && <TextHelper isValid={!errors[name]} errorMsg={errors[name]} />}
				</View>
			</View>

			<DatePicker
				modal
				mode={'time'}
				date={time}
				open={dateTimePicker}
				onConfirm={(date) => handleTimeConfirm(date)}
				onCancel={handleOnCloseModal}
				onDateChange={setTime}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	icon: {
		height: 28,
		width: 28,
		tintColor: colors.primary,
	},
	buttonContainer: {
		flex: 1,
		marginLeft: 12,
	},
	text: {
		fontSize: 13,
		color: colors.primaryFont,
		flex: 1,
		marginLeft: 10,
	},
	inputLabel: {
		fontSize: 13,
	},
	inputContainer: {
		backgroundColor: '#FAFAFA',
		borderWidth: 1,
		borderColor: '#D8D8D8',
		borderRadius: 5,
		alignItems: 'center',
		marginTop: 7,
		height: 40,
		flexDirection: 'row',
	},
});
