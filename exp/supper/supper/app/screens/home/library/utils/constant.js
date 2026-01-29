import BusinessIcon from 'assets/library/financial.png';
import FictionIcon from 'assets/library/wizard.png';
import SoftSkillsIcon from 'assets/library/discussion.png';
import GeneralInterestIcon from 'assets/library/puzzle.png';

export const ADD_ERROR = 'Error adding a new book to your reading list.';
export const ADD_SUCCESS =
	'You have successfully added a new book to your reading list!';
export const DELETE_ERROR = 'Error removing book from your reading list.';
export const DELETE_SUCCESS =
	'You have successfully removed book from your reading list!';
export const MARK_ERROR = 'Error marking book as read.';
export const MARK_SUCCESS = 'You have successfully marked book as read!';

export const LIBRARY_RECOMMENDED_TITLE = 'Recommended';
export const LIBRARY_E_PUBLICATION_TITLE = 'e-Publications';

export const eBookCentralURL =
	'https://ebookcentral.proquest.com/auth/lib/publicbank-ebooks/login.action?returnURL=https%3A%2F%2Febookcentral.proquest.com%2Flib%2Fpublicbank-ebooks%2Fhome.action';

export const genresItem = [
	{ type: 'Business', icon: BusinessIcon },
	{ type: 'Fiction', icon: FictionIcon },
	{ type: 'Soft Skills', icon: SoftSkillsIcon },
	{ type: 'General Interest', icon: GeneralInterestIcon },
];
