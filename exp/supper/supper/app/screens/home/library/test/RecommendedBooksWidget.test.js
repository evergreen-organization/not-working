import React from 'react';
import { RecommendedBooksWidget } from '../components';
import renderer from 'react-test-renderer';
import { DemoData } from 'constant';

test('GenresWidget renders correctly', () => {
  const recommended = DemoData.Library.Books.data;
  const loadingBooks = false;
  const props = {recommended, loadingBooks};

  const tree = renderer
  .create(<RecommendedBooksWidget {...props}/>)
  .toJSON();
  expect(tree).toMatchSnapshot();
});
