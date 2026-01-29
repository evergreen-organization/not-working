import { orderBy } from 'lodash';

export const searchBookText = (books, text) => {
	return books.filter(
		(book) =>
			book.title?.toLowerCase().includes(text.toLowerCase()) ||
			book.author?.toLowerCase().includes(text.toLowerCase()),
	);
};

export const filterBooks = (books, searchInput) => {
	let list = [];
	books.forEach((item) => {
		if (!item.contentURL && !item.title) {
			if (
				item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
				item.author.toLowerCase().includes(searchInput.toLowerCase())
			) {
				list.push(item);
			}
		} else {
			if (item.title.toLowerCase().includes(searchInput.toLowerCase())) {
				list.push(item);
			}
		}
	});
	return list;
};

export const filterBooksByGenre = ({ bookList, title }) => {
	return bookList.filter(
		(book) => book.genre?.toUpperCase() === title.toUpperCase(),
	);
};

export const sortBooksByDate = (bookList) => {
	return orderBy(bookList, [(obj) => new Date(obj.updateDt)], ['desc']);
};

export const getRecommendedBooks = (bookList) =>
	bookList.reduce(
		(recommendedList, item) =>
			(item.recommended === '1'
				? recommendedList.push(item)
				: recommendedList) && recommendedList,
		[],
	);

export const getTotalBooksRead = (bookList) =>
	bookList.reduce((total, item) => (item.readingStatus ? total + 1 : total), 0);
export const getReadingGoalsProgress = (done, goal) => done / goal;
