import Moment from 'moment';
import {
	FirsHalfLeaveMark,
	PPH1Mark,
	reliefMark,
	SecondHalfLeaveMark,
} from '../constant/constant';
import { colors } from 'configs';

const today = Moment().toDate();
const formattedToday = Moment(today).format('YYYY-MM-DD');
export const PublicHolidayLeaveInfo = [
	{
		code: null,
		company: 'PBB',
		companyCode: null,
		date: today,
		dayType: 0,
		days: 1,
		divisionCode: null,
		divisionGrpCode: null,
		edYmth: null,
		gradeCode: null,
		leaveCode: 'PPH1',
		levCategory: null,
		maxGradeCode: null,
		noOfDays: 0,
		personId: '11045',
		requesterStaffNo: null,
		stYmth: null,
		staffName: null,
		staffNo: null,
		startDate: null,
		status: null,
	},
];

export const PublicHolidayLeaveMarkObject = {
	[formattedToday]: {
		customStyles: { ...PPH1Mark },
	},
};

export const FullDayAnnualLeaveInfo = [
	{
		code: null,
		company: 'PBB',
		companyCode: null,
		date: today,
		dayType: 0,
		days: 1,
		divisionCode: null,
		divisionGrpCode: null,
		edYmth: null,
		gradeCode: null,
		leaveCode: 'A001',
		levCategory: null,
		maxGradeCode: null,
		noOfDays: 0,
		personId: '11045',
		requesterStaffNo: null,
		stYmth: null,
		staffName: null,
		staffNo: null,
		startDate: null,
		status: null,
	},
];

export const FullDayAnnualLeaveMarkObject = {
	[formattedToday]: {
		customStyles: {
			container: {
				backgroundColor: '#C0E5FF',
				borderRadius: 10,
			},
		},
	},
};

export const FirstHalfDayAnnualLeaveInfo = [
	{
		code: null,
		company: 'PBB',
		companyCode: null,
		date: today,
		dayType: 1,
		days: 1,
		divisionCode: null,
		divisionGrpCode: null,
		edYmth: null,
		gradeCode: null,
		leaveCode: 'A001',
		levCategory: null,
		maxGradeCode: null,
		noOfDays: 0,
		personId: '11045',
		requesterStaffNo: null,
		stYmth: null,
		staffName: null,
		staffNo: null,
		startDate: null,
		status: null,
	},
];

export const FirstHalfDayDayAnnualLeaveMarkObject = {
	[formattedToday]: {
		customStyles: {
			container: {
				...FirsHalfLeaveMark.container,
				borderLeftColor: '#C0E5FF',
				borderRadius: 10,
			},
			text: {
				...FirsHalfLeaveMark.text,
			},
		},
	},
};

export const SecondHalfDayAnnualLeaveInfo = [
	{
		code: null,
		company: 'PBB',
		companyCode: null,
		date: today,
		dayType: 2,
		days: 1,
		divisionCode: null,
		divisionGrpCode: null,
		edYmth: null,
		gradeCode: null,
		leaveCode: 'A001',
		levCategory: null,
		maxGradeCode: null,
		noOfDays: 0,
		personId: '11045',
		requesterStaffNo: null,
		stYmth: null,
		staffName: null,
		staffNo: null,
		startDate: null,
		status: null,
	},
];

export const SecondHalfDayAnnualLeaveMarkObject = {
	[formattedToday]: {
		customStyles: {
			container: {
				...SecondHalfLeaveMark.container,
				borderRightColor: '#C0E5FF',
				borderRadius: 10,
			},
			text: {
				...SecondHalfLeaveMark.text,
			},
		},
	},
};

export const reliefInfo = {
	[formattedToday]: [
		{
			date: formattedToday,
			duties: 'HP',
			edYmth: '012',
			halfDayType: 0,
			homeStateName: 'PULAU PINANG',
			index: 5,
			reliefBrh: 'HPCC-CAC(BTW)',
			reliefDate: '2023-03-20T00:00:00',
			stYmth: '001',
			staffId: null,
			year: 0,
		},
	],
};

export const reliefLeaveMarkObject = {
	[formattedToday]: { ...reliefMark },
};

export const reliefWithOthersLeaveMarkObject = {
	[formattedToday]: {
		customStyles: {
			container: {
				backgroundColor: '#C0E5FF',
				borderRadius: 10,
			},
			text: { color: colors.primary },
		},
	},
};
