const fetchLeaveSummary = {
	data: {
		dates: ['21/12', '22/12', '23/12', '24/12', '25/12', '26/12', '27/12'],
		totals: [1, 0.5, 1.5, 0, 0, 0, 0],
	},
	ok: true,
	status: 200,
};

const fetchStaffLeaveReport = {
	data: [
		{
			groupName: 'COMPUTER SUPPORT OFFICER',
			staffs: [
				{
					name: 'UAT-10006',
					staffNo: '10006',
				},
			],
		},
		{
			groupName: 'SENIOR MANAGER',
			staffs: [
				{
					name: 'NASRUDIN BIN SALLEH',
					staffNo: '28844',
				},
			],
		},
	],
	ok: true,
	status: 200,
};

export const DashBoardData = Object.assign(
	{},
	{
		LeaveSummary: fetchLeaveSummary,
		LeaveReport: fetchStaffLeaveReport,
	},
);
