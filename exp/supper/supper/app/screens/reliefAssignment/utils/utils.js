import moment from 'moment';
import {
	LeaveRecordMark,
	PublicHolidayLeaveMark,
	reliefMark,
	SelectedDayMark,
} from '../constant/constant';

export const generateLeaveMark = ({ leaveCode, dayType, existMarkedObj }) => {
	/* Public Holiday*/
	if (leaveCode === 'PPH1') {
		return PublicHolidayLeaveMark;
	}
	/* full day or apply first and second half apply at the same day*/
	if (dayType === 0 || (existMarkedObj && existMarkedObj.dayType !== 0)) {
		return LeaveRecordMark(leaveCode)[0];
	}
	/* match first half and second half leave type*/
	return LeaveRecordMark(leaveCode)[dayType];
};

export const createLeaveMarkDateObject = ({ markedObj, leaveInfo }) => {
	let tempMarkedDateAttr = markedObj;
	for (let item of leaveInfo) {
		const formattedDate = moment(item.date, 'M/D/YYYY').format('YYYY-MM-DD');
		tempMarkedDateAttr[formattedDate] = generateLeaveMark({
			leaveCode: item.leaveCode,
			dayType: item.dayType,
			existMarkedObj: tempMarkedDateAttr[formattedDate],
		});
	}

	return tempMarkedDateAttr;
};

export const createReliefMarkDateObject = ({ reliefInfo, leaveMarkedObj }) => {
	for (const field in reliefInfo) {
		const leaveMarkValue = leaveMarkedObj[field];
		const reliefMarkTextStyles = reliefMark.customStyles.text;

		leaveMarkedObj[field] = {
			customStyles: {
				...leaveMarkValue?.customStyles,
				text: {
					...leaveMarkValue?.customStyles.text,
					...reliefMarkTextStyles,
				},
			},
		};
	}
	return leaveMarkedObj;
};

export const formatSelectedDay = (day) =>
	`${day.year}-${day.month?.toString().padStart(2, '0')}-${day.day
		?.toString()
		.padStart(2, '0')}`;

export const createAgendaDateObject = ({
	dateObj,
	endDate,
	startDate,
	reliefInfo,
}) => {
	let tempDate;
	let tempDateObj = dateObj;
	let diff = endDate.diff(startDate, 'days');
	for (let i = 0; i <= diff; i++) {
		tempDate = startDate.add(1, 'days');
		const formattedTempDate = tempDate.format('YYYY-MM-DD');
		if (reliefInfo[formattedTempDate]) {
			tempDateObj[formattedTempDate] = reliefInfo[formattedTempDate];
		} else if (!tempDateObj[formattedTempDate]) {
			// set empty only if existing DateObj do not have anything to prevent override other years record
			tempDateObj[formattedTempDate] = [];
		}
	}
	return tempDateObj;
};

export const createSelectedDayObject = ({
	markedObjWithoutSelectedDay,
	selectedDay,
}) => {
	let markedObjWithSelectedDay = {};
	if (markedObjWithoutSelectedDay) {
		markedObjWithSelectedDay = JSON.parse(
			JSON.stringify(markedObjWithoutSelectedDay),
		);
	}

	/* if there is no existing marking style, only will assign selected day marked style*/
	if (!markedObjWithSelectedDay[selectedDay]?.customStyles?.container) {
		markedObjWithSelectedDay[selectedDay] = SelectedDayMark;
	}
	return markedObjWithSelectedDay;
};

export const getDifferentYears = ({ months, currentYear }) =>
	months
		.filter((date) => !currentYear?.includes(date.year))
		.map((date) => date.year);
