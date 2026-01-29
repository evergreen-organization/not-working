import Moment from 'moment/moment';

const formattedToday = Moment().format('YYYY-MM-DD');

const seatingArrangement = {
	seminarSeating: 'Table 1',
	dinnerTableSeating: 'Table 2',
	lunchTableSeating: 'Table 3',
	breakupSession: 'Table 6',
};
const eventListData = {
	ok: true,
	status: 200,
	data: [
		{
			eventId: '1',
			eventName: 'Wedding Dinner',
			totalParticipants: 20,
			eventType: 'Dinner',
			eventDateTime: formattedToday,
			isAdmin: true,
			checkInStatus: true,
			seatingArrangement,
			eventLocation: 'Sunway Hotel',
			eventDescription: 'Casual Gathering',
		},
		{
			eventId: '2',
			eventName: 'Birthday',
			totalParticipants: 20,
			eventType: 'Birthday',
			eventDateTime: formattedToday,
			isAdmin: false,
			eventLocation: 'Mc Donald',
			eventDescription: 'Mc Donald Birthday Party',
		},
		{
			eventId: '3',
			eventName: 'Trip to overseas',
			totalParticipants: 20,
			eventType: 'Trip',
			eventDateTime: formattedToday,
			isAdmin: true,
			checkInStatus: false,
			seatingArrangement,
			eventLocation: 'Japan',
			eventDescription: 'Team Building',
		},
	],
};

const attendeesListData = {
	ok: true,
	status: 200,
	data: [
		{ staffName: 'Alice', staffId: '123456', id: '1' },
		{ staffName: 'Bob', staffId: '23456', id: '2' },
		{ staffName: 'Catherine', staffId: '34567', id: '3' },
	],
};

const eventStatisticsData = {
	ok: true,
	status: 200,
	data: { totalCheckIn: 15, totalUnCheckIn: 5 },
};

const pendingAttendeeListData = {
	ok: true,
	status: 200,
	data: {
		departments: [
			{
				departmentName: 'Knowledge and Learning',
				staffName: ['Daniel', 'Elaine'],
			},
			{ departmentName: 'Relief', staffName: ['Flora', 'Gwen', 'Henry'] },
			{
				departmentName: 'Information Technology',
				staffName: ['Isabella', 'Jane'],
			},
		],
	},
};

const seatingArrangementData = {
	ok: true,
	status: 200,
	data: seatingArrangement,
};

const checkInStatusData = {
	ok: true,
	status: 200,
	data: { checkInStatus: false },
};

const checkInAttendeesData = {
	ok: true,
	status: 200,
	data: { checkInAttendees: [{ checkInStatus: 'Success', staffName: 'Demo' }] },
};

const checkInQrData = {
	ok: true,
	status: 200,
	data: {
		status: 'Checked in',
	},
};

export const InvitationData = {
	EventList: eventListData,
	Attendees: attendeesListData,
	Statistics: eventStatisticsData,
	PendingAttendees: pendingAttendeeListData,
	SeatingArrangement: seatingArrangementData,
	CheckInStatus: checkInStatusData,
	CheckInAttendees: checkInAttendeesData,
	CheckInQr: checkInQrData,
};
