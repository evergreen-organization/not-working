const enrollNotification = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

const enableNotification = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

const disableNotification = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

const fetchIndividualNotification = {
	data: [
		{
			attachments: [],
			body: 'Hello',
			categoryId: 0,
			contentId: 12561,
			count: 0,
			createdBy: null,
			dateTime: '2022-12-28T18:54:57.013',
			description: null,
			imageUrl: '',
			readStatus: false,
			staffId: null,
			title: 'Hello',
			validDuration: '05/31/2023 00:00:00',
		},
	],
	status: 200,
	ok: true,
};

const createNotification = {
	data: {
		contentId: 12660,
	},
	status: 200,
	ok: true,
};

const pushNotification = {
	data: {
		response: true,
	},
	status: 200,
	ok: true,
};

const fetchAttachmentStatus = {
	data: {
		response: true,
	},
	status: 200,
	ok: true,
};

const fetchNotificationDetails = {
	data: {
		attachments: [],
		body: 'Hello',
		categoryId: 1,
		contentId: 12052,
		count: 0,
		createdBy: null,
		dateTime: '2022-12-28T18:54:57.013',
		description: 'Hello',
		imageUrl: '',
		readStatus: false,
		staffId: null,
		title: 'Hello',
		validDuration: null,
	},
	status: 200,
	ok: true,
};

export const NotificationData = {
	Enroll: enrollNotification,
	Enable: enableNotification,
	Disable: disableNotification,
	IndividualNotification: fetchIndividualNotification,
	CreatePushNotification: createNotification,
	PushNotification: pushNotification,
	NotificationDetails: fetchNotificationDetails,
	AttachmentStatus: fetchAttachmentStatus,
};
