const fetchEPublications = {
	data: [
		{
			contentType: 'P',
			contentURL:
				'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/CONTENT/86_SnL_Leadership%20trans.pdf',
			coverpageURL:
				'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/COVER_PAGE/86_emerald.jpg',
			genre: 'SOFT SKILLS',
			issueNo: 'Vol 50 No. 1',
			link: null,
			title: 'Leadership transformation reading list',
			updateDt: '8/25/2022 16:51:02',
		},
		{
			contentType: 'P',
			contentURL:
				'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/CONTENT/90_AMoney_Hong%20Kongs%20Do.pdf',
			coverpageURL:
				'https://xperience-uat.pbebank.com:4430/pbexperience/PUBLICATION/COVER_PAGE/90_asiamoney.jpg',
			genre: 'BUSINESS',
			issueNo: '12 July 2022',
			link: null,
			title: 'Hong Kong’s dollar peg feels the heat',
			updateDt: '8/25/2022 16:49:30',
		},
	],
	ok: true,
	status: 200,
};

const fetchBooks = {
	data: [
		{
			author: 'Bill Franks',
			genre: 'GENERAL INTEREST',
			isbn: '978-1-492-07266-9',
			publisher: 'Sebastopol, CA: O’Reilly Media Inc.',
			recommended: '1',
			title: '97 Things About Ethics Everyone In Data Science Should Know',
			updateDt: '8/30/2022 11:19:58',
			url: 'https://xperience-uat.pbebank.com:4430/pbexperience/BOOK/80_97%20THINGS%20ABOUT%20ETHI.jpg',
			year: '2020',
		},
		{
			author: 'James Robert Lay',
			genre: 'BUSINESS',
			isbn: '978-5445-0771-2',
			publisher: 'United States: Lioncrest Publishing',
			recommended: '1',
			title:
				'Banking on Digital Growth : The Strategic Marketing Manifesto To Transform Financial Brands',
			updateDt: '8/30/2022 11:19:28',
			url: 'https://xperience-uat.pbebank.com:4430/pbexperience/BOOK/82_BANKING%20ON%20DIGITAL%20G.jpg',
			year: '2020',
		},
	],
	ok: true,
	status: 200,
};

const fetchReadingList = {
	data: [
		{
			author: 'Author 1',
			id: 1,
			readingStatus: false,
			staffNo: '39940',
			title: 'Title 1',
			year: '2022',
		},
		{
			author: 'Author 2',
			id: 2,
			readingStatus: false,
			staffNo: '39940',
			title: 'Title 2',
			year: '2022',
		},
	],
};

const submitReadingList = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

const editReadingList = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

const removeReadingList = {
	data: {
		response: true,
	},
	ok: true,
	status: 200,
};

export const LibraryData = Object.assign(
	{},
	{
		Books: fetchBooks,
		ReadingList: fetchReadingList,
		EPublications: fetchEPublications,
		SubmitReadingList: submitReadingList,
		EditReadingList: editReadingList,
		RemoveReadingList: removeReadingList,
	},
);
