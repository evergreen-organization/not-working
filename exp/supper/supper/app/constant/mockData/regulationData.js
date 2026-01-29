const fetchRegulationList = {
	data: [
		{
			circularDesc: 'Quick Guide to Foreign Exchange Policy',
			circularId: 1,
			circularImage:
				'https://xperience-uat.pbebank.com:4430/pbexperience/FAQ/8_1.png',
			circularName: 'Foreign Exchange Policy (FEP)',
			lastUpdateStamp: '6/30/2021 20:02:59',
			lastUpdateStampDT: '2021-06-30T20:02:59.953',
		},
	],
	ok: true,
	status: 200,
};

const fetchRegulationDetails = {
	data: {
		answerMappings: [
			{
				answerCombination: [2, 5, 15],
				toDialog: 11,
			},
			{
				answerCombination: [2, 5, 14],
				toDialog: 10,
			},
		],
		circularCategoryDetails: {
			circularDesc: 'Quick Guide to Foreign Exchange Policy',
			circularId: 1,
			circularImage:
				'https://xperience-uat.pbebank.com:4430/pbexperience/FAQ/8_1.png',
			circularName: 'Foreign Exchange Policy (FEP)',
			lastUpdateStamp: '6/30/2021 20:02:59',
			lastUpdateStampDT: '2021-06-30T20:02:59.953',
			overallViewCount: 1576,
		},
		circularRating: null,
		dialogs: [
			{
				answers: [
					{
						answerGroup: 1,
						answerId: 1,
						answerText: 'Borrowing',
						dialogId: 1,
						toDialog: 2,
					},
					{
						answerGroup: 2,
						answerId: 2,
						answerText: 'Payment',
						dialogId: 1,
						toDialog: 3,
					},
				],
				attachments: [
					{
						attachmentId: 10,
						attachmentName: 'FE Notices Learning Tools and Helpdesk.pdf',
						attachmentType: 'P',
						attachmentUrl:
							'https://xperience-uat.pbebank.com:4430/pbexperience/FAQ/6_FE%20Notices%20Learning%20.pdf',
						dialogId: 1,
					},
				],
				circularId: null,
				dialogContent: '<html></html>',
				dialogHeader: 'Foreign Exchange Rules',
				dialogId: 1,
				dialogLevel: 0,
				images: [],
				termDefinitions: [
					{
						term: 'Borrowing',
						termContent: '<html></html>',
						termHeader: 'Borrowing',
						termId: 7,
					},
				],
			},
		],
		landingPageDetail: {
			attachments: [
				{
					attachmentId: 3,
					attachmentName: 'Refinement in Foreign Exchange Policy.pdf',
					attachmentType: 'P',
					attachmentUrl:
						'https://xperience-uat.pbebank.com:4430/pbexperience/FAQ/3_Refinement%20in%20Foreig.pdf',
					dialogId: 155,
				},
				{
					attachmentId: 4,
					attachmentName: 'Common Queries on Foreign Exchange Policy.pdf',
					attachmentType: 'P',
					attachmentUrl:
						'https://xperience-uat.pbebank.com:4430/pbexperience/FAQ/4_Common%20Queries%20on%20Fo.pdf',
					dialogId: 155,
				},
			],
			description: '<html></html>',
			images: [],
			links: [
				{
					attachmentId: 1,
					attachmentName: 'Resources Link',
					attachmentType: 'L',
					attachmentUrl: 'https://www.bnm.gov.my/fep',
					dialogId: 155,
				},
			],
			surveyUrl: 'https://surveymonkey.com/r/FEPappSurvey',
			title: 'FOREIGN EXCHANGE (FE) POLICY',
		},
		name: 'Foreign Exchange Policy (FEP)',
	},
	ok: true,
	status: 200,
};

const updateDateLastStamp = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

export const RegulationData = Object.assign(
	{},
	{
		RegulationList: fetchRegulationList,
		RegulationDetails: fetchRegulationDetails,
		UpdateDateLastStamp: updateDateLastStamp,
	},
);
