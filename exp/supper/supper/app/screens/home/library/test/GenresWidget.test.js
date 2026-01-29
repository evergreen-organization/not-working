import React from 'react';
import { GenresWidget } from '../components';
import renderer from 'react-test-renderer';

test('GenresWidget Snapshot', () => {
  const snap = renderer.create(<GenresWidget />).toJSON();
  expect(snap).toMatchSnapshot();
});
