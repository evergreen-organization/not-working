import Moment from 'moment';

import {
  getMaxDate,
  getMinDate,
  getStateNameById
} from '../utils';
import {
  selectedFromDate,
  stateList
} from './testData';

//Note: command to run this single test suite:
//jest -t 'Interstate Travel utils test'

describe.only('Interstate Travel utils test', () => {
  test('Interstate Travel - get state name by ID', () => {
    expect(getStateNameById("05", stateList)).toBe("KELANTAN");
    expect(getStateNameById("04", stateList)).toBe("KEDAH");
  });

  test('Interstate Travel - get Minimum date', () => {
    expect(getMinDate('to', selectedFromDate)).toBe(selectedFromDate);
  });

  test('Interstate Travel - get Maximum date', () => {
    expect(getMaxDate('from', 'Domestic')).toBe(Moment().add(14, 'days').format('YYYY-MM-DD'));
    expect(getMaxDate('from', 'International')).toBe(Moment().add(3, 'months').format('YYYY-MM-DD'));
  });
})
