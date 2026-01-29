import Moment from 'moment/moment';
import CryptoJs from 'crypto-js';
import { Config } from '../../../../../env';
import { EVENT_CATEGORY } from '../constant';

export const formatSeatingArrangement = (seatingArrangement, category) => {
	if (
		seatingArrangement?.seminarSeating &&
		category === EVENT_CATEGORY.SEMINAR
	) {
		return category + ': ' + seatingArrangement.seminarSeating;
	}
	if (
		seatingArrangement?.dinnerTableSeating &&
		category === EVENT_CATEGORY.DINNER
	) {
		return category + ': ' + seatingArrangement.dinnerTableSeating;
	}
	if (
		seatingArrangement?.lunchTableSeating &&
		category === EVENT_CATEGORY.LUNCH
	) {
		return category + ': ' + seatingArrangement.lunchTableSeating;
	}
	if (
		seatingArrangement?.breakupSession &&
		category === EVENT_CATEGORY.BREAKUP
	) {
		return category + ': ' + seatingArrangement.breakupSession;
	}
	return category + ': Free seating';
};
export const generateQrValue = ({ staffId }) => {
	const now = Moment();
	const salt = Config.EVENT_SALT;
	const hashClearText = staffId + now.format('MMDDssmmHH') + salt;
	const hashValue = CryptoJs.SHA512(hashClearText);
	return staffId + '|' + now.format('YYYYMMDDHHmmss') + '|' + hashValue;
};

export const getCheckInTime = () =>
	Moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';

export const isLateCheckIn = (checkInTime) =>
	Moment().isAfter(Moment(checkInTime));

export const formatAttendeeList = (data) =>
	data.map((item) => {
		return {
			Name: item.staffName + ' - ' + item.staffId,
			Id: item.id,
		};
	});
