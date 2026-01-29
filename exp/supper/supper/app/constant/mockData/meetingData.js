import Moment from 'moment';
const today = Moment().toDate();

const fetchMeetingList = {
	data: {
		code: null,
		companyCode: null,
		divisionCode: null,
		divisionGrpCode: null,
		edYmth: null,
		events: [
			{
				end: {
					date: Moment(today).format('YYYY-MM-DD'),
					time: '06:00:00',
					utc: false,
				},
				href: '/mail3/b0039940.nsf/api/calendar/events/7FF8E5D7F9BF78FD4825891E000A5E05-Lotus_Notes_Generated',
				id: '7FF8E5D7F9BF78FD4825891E000A5E05',
				location: null,
				room: 'ITD2A/PBB-BangiPBBG',
				start: {
					date: Moment(today).format('YYYY-MM-DD'),
					time: '05:00:00',
					utc: false,
				},
				status: 'I',
				summary:
					'"Invitation: 2022 Year End Closing - Preparation & Checklist - 31/12/2022 (Saturday)- Final Touch Base Follow Up',
			},
		],
		maxGradeCode: null,
		noOfDays: 0,
		personId: null,
		requesterStaffNo: null,
		stYmth: null,
		staffNo: null,
		startDate: null,
		status: null,
	},
	ok: true,
	status: 200,
};

const fetchMeetingDetails = {
	data: {
		description:
			'"1)  Review Year-end checklist \n' +
			'\n' +
			'2)  Batch Start Time\n' +
			'\n' +
			'3)  On-site / Off-site standby \n' +
			'\n' +
			'4) )  Others\n' +
			'\n' +
			'\n' +
			'"',
		fyiAttendees: [],
		optionalAttendees: [],
		requireAttendees: [
			{
				displayName: 'Sivananthiram M Muthuthamby/ITNOC/PBB/PBBG',
				email: 'sivananthirampublicbank.com.my',
			},
			{
				displayName: 'Chan Chiong Ann/ITNOC/PBB/PBBG',
				email: 'chan.chiongannpublicbank.com.my',
			},
		],
	},
	ok: true,
	status: 200,
};

export const MeetingData = Object.assign(
	{},
	{
		MeetingList: fetchMeetingList,
		MeetingDetails: fetchMeetingDetails,
	},
);
