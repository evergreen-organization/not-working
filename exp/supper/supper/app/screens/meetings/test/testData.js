import Moment from 'moment';

const today = Moment().toDate();
const nextDay = Moment(today).add(1, 'day').format('YYYY-MM-DD');
export const CLOSE_TO_BOTTOM = {
	contentOffset: { y: 1580.3333333333333, x: 0 },
	contentSize: { width: 390, height: 2251.333251953125 },
	layoutMeasurement: { width: 390, height: 668 },
};

export const CURRENT_MEETING_LIST = [
	{
		id: 456,
		start: { date: '2023-01-04' },
	},
	{
		id: 100,
		start: { date: '2023-01-05' },
	},
	{
		id: 123,
		start: { date: '2023-01-01' },
	},
	{ id: 789, start: { date: nextDay } },
];

export const NEW_MEETING_LIST = [
	{
		id: 123,
		start: { date: '2023-01-01' },
	},
	{
		id: 234,
		start: { date: '2023-01-04' },
	},
];

export const NEW_MEETING_LIST_2 = [
	{
		id: 123,
		start: { date: '2023-01-01' },
	},
];

export const FOUND_MEETINGS = { id: 123, start: { date: '2023-01-01' } };

export const LATEST_MEETING_EVENT = {
	id: 789,
	start: { date: nextDay },
};
