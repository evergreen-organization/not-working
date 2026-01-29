import {
	formatSelectedLeaveReportDate,
	formatStaffLeaveReportData,
	formatStaffLeaveReportLegend,
} from '../utils';
import {
	STAFF_LEAVE_REPORT_LEGEND,
	STAFF_LEAVE_REPORT_DATA,
	FORMATTED_STAFF_LEAVE_REPORT_DATA,
} from './testData';
import { defaultStaffLeaveReportDataSet } from '../styles';

test('Dashboard- format leave report legend', () => {
	expect(formatStaffLeaveReportLegend(STAFF_LEAVE_REPORT_DATA)).toEqual(
		STAFF_LEAVE_REPORT_LEGEND,
	);
});

test('Dashboard- format selected leave report date', () => {
	const day = { year: '2022', month: '3', day: '12' };
	expect(formatSelectedLeaveReportDate(day)).toBe('2022-03-12');
});

test('Dashboard- format staff leave report data', () => {
	expect(formatStaffLeaveReportData([])).toEqual(
		defaultStaffLeaveReportDataSet,
	);
	expect(formatStaffLeaveReportData(STAFF_LEAVE_REPORT_DATA)).toEqual(
		FORMATTED_STAFF_LEAVE_REPORT_DATA,
	);
});
