import {
  searchBookText,
  filterBooks,
  filterBooksByGenre,
  sortBooksByDate,
  getRecommendedBooks,
  getTotalBooksRead,
} from '../utils';
import {
  allBooks,
  readingList,
  recommendedBooks,
  businessGenreBooks,
  sortedBooksByDateDesc,
  filterBookResult,
} from './testData';

describe('Test Library Utils', () => {
  test('Reading Goals - getTotalBooksRead', () => {
    expect(getTotalBooksRead(readingList)).toEqual(1);
  });

  test('Get recommended books', () => {
    expect(getRecommendedBooks(allBooks))
    .toEqual(
      expect.arrayContaining(recommendedBooks))
  });

  test('Filter books by Genre', () => {
    const bookList = allBooks;
    const title = 'business';
    expect(filterBooksByGenre({bookList, title})).toStrictEqual(businessGenreBooks);
  });

  test('Sort books by date', () => {
    expect(sortBooksByDate(allBooks)).toEqual(
      expect.arrayContaining(sortedBooksByDateDesc))
  });

  test('Filter books by search input', () => {
    expect(filterBooks(allBooks, 'fish')).toStrictEqual(filterBookResult)
  });

  test('Search books', () => {
    expect(searchBookText(allBooks, 'fish')).toStrictEqual(filterBookResult)
  })
});
