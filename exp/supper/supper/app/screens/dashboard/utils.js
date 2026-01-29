import Moment from 'moment';
import { processColor } from 'react-native';

import { dateFormat } from 'configs';
import { colorArray } from './constant';
import { chartStyles } from './styles';

export const formatSelectedLeaveReportDate = (day) => {
	return Moment([day.year, day.month, day.day].join('-'), 'YYYY-M-D').format(
		dateFormat.DATE_YMD,
	);
};

export const formatStaffLeaveReportLegend = (data) =>
	data.map((item, index) => {
		return {
			label: item.groupName,
			color: colorArray[index],
		};
	});

export const formatStaffLeaveReportData = (data) => {
	const dataSets = data.map((item, index) => {
		return {
			values: [item.staffs.length],
			label: item.groupName,
			staffList: item.staffs,
			config: {
				drawValues: false,
				colors: [processColor(colorArray[index])],
			},
		};
	});
	if (dataSets.length === 1) {
		dataSets.push(chartStyles.defaultStaffLeaveReportDataSet);
	}
	return dataSets;
};
