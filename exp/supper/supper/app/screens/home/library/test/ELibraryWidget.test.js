import React from 'react';
import { ELibraryWidget } from '../components';
import renderer from 'react-test-renderer';

test('ELibraryWidget Snapshot', () => {
  const snap = renderer.create(<ELibraryWidget />).toJSON();
  expect(snap).toMatchSnapshot();
});
