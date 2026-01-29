const fetchComplianceStatus = {
	data: [
		{
			personId: null,
			totalClassRoomCreditDays: 14,
			totalComplied: 125.3,
			totalDigitalCreditDays: 109.6,
			totalElearningCreditDays: 3,
			totalPending: 0,
		},
	],
	ok: true,
	status: 200,
};

const fetchPendingCourse = {
	data: [
		{
			courseName: 'Banker Customer Relationship',
			personId: '39940',
			reason: null,
			scheduleEndDate: '2022-01-11T00:00:00',
			scheduleStartDate: '2022-01-10T00:00:00',
			status: 'Nominated',
		},
	],
	ok: true,
	status: 200,
};

const fetchCompleteCourse = {
	data: [
		{
			courseCode: 'DMDLDS0001',
			courseName: 'Communication in the 21st Century Workplace',
			datePassed: '2022-01-25T00:00:00',
			personId: '39940',
		},
		{
			courseCode: 'DISBKG0013',
			courseName:
				'Case Study: Issues and Challenges in Implementing Shariah Governance',
			datePassed: '2022-01-21T00:00:00',
			personId: '39940',
		},
	],
	ok: true,
	status: 200,
};

const fetchTrainingReminder = {
	data: [
		{
			message:
				'Postpone:  "Banker Customer Relationship" 10 Jan 2022 - 11 Jan 2022',
			messageDate: '2022-02-23T11:14:57',
			personId: '39940',
		},
		{
			message:
				'You have been nominated for: "Virtual : Banking Practices" 07 Feb 2022 - 07 Feb 2022',
			messageDate: '2022-08-16T10:48:50',
			personId: '39940',
		},
	],
};

export const TrainingData = Object.assign(
	{},
	{
		ComplianceStatus: fetchComplianceStatus,
		CompleteCourse: fetchCompleteCourse,
		TrainingReminder: fetchTrainingReminder,
		PendingCourse: fetchPendingCourse,
	},
);
