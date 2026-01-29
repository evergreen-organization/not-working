import {
	createAgendaDateObject,
	createLeaveMarkDateObject,
	createReliefMarkDateObject,
	formatSelectedDay,
	getDifferentYears,
} from '../utils/utils';
import {
	FirstHalfDayAnnualLeaveInfo,
	FirstHalfDayDayAnnualLeaveMarkObject,
	FullDayAnnualLeaveInfo,
	FullDayAnnualLeaveMarkObject,
	PublicHolidayLeaveInfo,
	PublicHolidayLeaveMarkObject,
	reliefInfo,
	reliefLeaveMarkObject,
	reliefWithOthersLeaveMarkObject,
	SecondHalfDayAnnualLeaveInfo,
	SecondHalfDayAnnualLeaveMarkObject,
} from './testData';
import moment from 'moment';

describe('Relief- Create Leave Date Object', () => {
	test('Public Holiday Leave Marked Object', () => {
		expect(
			createLeaveMarkDateObject({
				markedObj: {},
				leaveInfo: PublicHolidayLeaveInfo,
			}),
		).toEqual(PublicHolidayLeaveMarkObject);
	});
	test('Full Day Annual Leave Marked Object', () => {
		expect(
			createLeaveMarkDateObject({
				markedObj: {},
				leaveInfo: FullDayAnnualLeaveInfo,
			}),
		).toEqual(FullDayAnnualLeaveMarkObject);
	});
	test('First Half Day Annual Leave Marked Object', () => {
		expect(
			createLeaveMarkDateObject({
				markedObj: {},
				leaveInfo: FirstHalfDayAnnualLeaveInfo,
			}),
		).toEqual(FirstHalfDayDayAnnualLeaveMarkObject);
	});
	test('Second Half Day Annual Leave Marked Object', () => {
		expect(
			createLeaveMarkDateObject({
				markedObj: {},
				leaveInfo: SecondHalfDayAnnualLeaveInfo,
			}),
		).toEqual(SecondHalfDayAnnualLeaveMarkObject);
	});
});

describe('Relief-Create Relief Leave Mark Object', () => {
	test('Create Relief Marked Object Without Others Leave Object', () => {
		expect(
			createReliefMarkDateObject({
				reliefInfo: reliefInfo,
				leaveMarkedObj: {},
			}),
		).toEqual(reliefLeaveMarkObject);
	});
	test('Create Relief Marked Object With Others Leave Object', () => {
		expect(
			createReliefMarkDateObject({
				reliefInfo: reliefInfo,
				leaveMarkedObj: FullDayAnnualLeaveMarkObject,
			}),
		).toEqual(reliefWithOthersLeaveMarkObject);
	});
});

test('Relief- format selected day', () => {
	expect(formatSelectedDay({ year: '2023', month: '3', day: '11' })).toBe(
		'2023-03-11',
	);
	expect(formatSelectedDay({ year: '2023', month: '3', day: '1' })).toBe(
		'2023-03-01',
	);
});

describe('Relief - Create Relief Agenda Object', () => {
	test('Create relief agenda object', () => {
		expect(
			createAgendaDateObject({
				dateObj: {},
				startDate: moment().add(-1, 'Y'),
				endDate: moment().add(1, 'Y'),
				reliefInfo: reliefInfo,
			}),
		).toMatchObject(reliefInfo);
	});
});

test('Relief- Get Different Year', () => {
	expect(
		getDifferentYears({
			months: [
				{
					dateString: '2023-02-15',
					day: 15,
					month: 2,
					timestamp: 1676419200000,
					year: 2023,
				},
				{
					dateString: '2022-02-15',
					day: 15,
					month: 2,
					timestamp: 1676419200000,
					year: 2022,
				},
				{
					dateString: '2022-02-15',
					day: 15,
					month: 2,
					timestamp: 1676419200000,
					year: 2022,
				},
			],
			currentYear: [2023],
		}),
	).toStrictEqual([2022, 2022]);
});
