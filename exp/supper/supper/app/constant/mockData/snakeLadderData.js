const initGame = {
	data: {
		coins: 10000,
		playerPosition: 0,
	},
};

const campStatus = {
	data: {
		isStarted: 'STARTED',
	},
};

const questionBankList = {
	data: {
		questionSession: '123ghijk',
		questions: [
			{
				questionId: 10053,
				topic: 'Science',
				options: ['Hydrogen', 'Oxygen', 'Carbon', 'Nitrogen'],
				questionText: 'What is the first element on the periodic table?; It has one electron',
			},
			{
				questionId: 10089,
				topic: 'Math',
				options: ['Watt', 'Ampere', 'Ohm', 'Volt'],
				questionText: 'What is the unit of electrical resistance?',
			},
			{
				questionId: 10035,
				topic: 'Biology',
				options: ['Civil War', 'Revolutionary War', 'World War', 'Korean Conflict'],
				questionText:
					'What war was fought between the North and South regions of the United States?',
			},
		],
	},
};

const campaignList = {
	data: [
		{
			campaignId: 1,
			name: 'Gamification Campaign DEMO',
			startDate: '8/11/2025 00:00:00',
			endDate: '9/12/2026 00:00:00',
			viewEndDate: '9/13/2026 00:00:00',
			imageUrl: '',
			disclaimer: 'Gamification DEMO',
			todayDate: '9/10/2025 17:25:30',
		},
		{
			campaignId: 7,
			name: 'Testing Campaign',
			startDate: '9/14/2025 00:00:00',
			endDate: '9/17/2025 00:00:00',
			viewEndDate: '9/18/2025 00:00:00',
			imageUrl: null,
			disclaimer: 'For testing purpose',
			todayDate: '9/11/2025 10:51:40',
		},
	],
};

const apiStatus = 'HTTP 200 OK';

const leaderBoard = {
	data: {
		myScore: {
			id: '67059',
			score: 0,
			ranking: 3,
		},
		playersScore: [
			{
				name: 'UAT-38603',
				id: 38603,
				score: 0,
				ranking: 1,
			},
			{
				name: 'UAT-72142',
				id: 72142,
				score: 0,
				ranking: 2,
			},
			{
				name: 'UAT-67059',
				id: 67059,
				score: 0,
				ranking: 3,
			},
			{
				name: 'Abu Jahal',
				id: 75396,
				score: 0,
				ranking: 4,
			},
			{
				name: 'UAT-53867',
				id: 53867,
				score: 0,
				ranking: 5,
			},
		],
	},
};

export const SnakeLadderData = {
	initGame,
	campStatus,
	questionBankList,
	apiStatus,
	campaignList,
	leaderBoard,
};
