import React from 'react';
import { useFormikContext } from 'formik';
import Moment from 'moment';
import { BottomModal, CalendarList } from 'molecules';
import { DATE_YMD } from 'configs/dateFormat';
import { FormDropDown } from '../formDropDown';

const defaultMaximumDate = Moment().add(1, 'y').toDate().toDateString();

export const FormCalendarModalView = ({
	handleShowModal,
	handleCloseModal,
	handleDayPress,
	isCalendarShow,
	selectedDate,
	maximumDate,
	minimumDate,
	disabled,
	name,
	label,
	mandatory,
	pastScrollRange,
	futureScrollRange,
	dateFormat,
}) => {
	const today = Moment().toDate();
	const { values } = useFormikContext();

	return (
		<FormDropDown
			name={name}
			label={label}
			mandatory={mandatory}
			disabled={disabled}
			onFormPickerPress={handleShowModal}
			placeholder={'Select Date'}
			value={Moment(values[name]).format(dateFormat)}
			renderModal={
				<BottomModal isVisible={isCalendarShow} onCancel={handleCloseModal}>
					<CalendarList
						current={Moment(today).format(DATE_YMD)}
						onDayPress={handleDayPress}
						minDate={minimumDate ?? null}
						maxDate={maximumDate ?? defaultMaximumDate}
						disableMonthChange={true}
						markingType={'custom'}
						markedDates={selectedDate}
						pastScrollRange={pastScrollRange}
						futureScrollRange={futureScrollRange}
					/>
				</BottomModal>
			}
		/>
	);
};
