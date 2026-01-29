import React from 'react';
import ReadingGoalWidget from '../components/readingGoalsWidget';
import {
  render,
  screen
} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { DemoData } from 'constant';

//This function that calculates reading goals was inside stores/library.js,
// should it be moved to any util or is it okay to clone the code here inside test script?
const getGoalsFromReadingList = () => {
  const readingList = DemoData.Library.ReadingList;
  let counter = 0;

  readingList.data.forEach(item => {
    if (item.readingStatus) {
      counter++;
    }
  });

  return {
    done: counter,
    goal: readingList.data.length,
  };
};

describe('ReadingGoal Widget', () => {
  const goals = getGoalsFromReadingList();
  const loading = false;
  const props = { goals, loading };

  it('renders correctly', () => {
    const tree = renderer.create(<ReadingGoalWidget {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  //Commented out, not testing UI at the moment
  it('displays expected goal values', () => {
    render(<ReadingGoalWidget {...props} />);

    const { getByTestId } = screen;
    const goalsDone = getByTestId('done-goals');
    const totalGoals = getByTestId('total-goals');

    expect(goalsDone.props.children).toEqual(0);
    expect(totalGoals.props.children).toEqual(2);
  });
});
