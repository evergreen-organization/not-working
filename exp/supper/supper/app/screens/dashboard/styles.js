import { processColor } from 'react-native';
import { colors } from 'configs';
import { colorArray } from './constant';

const marker = {
	enabled: true,
	markerColor: processColor('#E7E7E7'),
	textColor: processColor(colors.primaryFont),
	textSize: 13,
};
const legendBar = {
	enabled: false,
	textSize: 13,
	form: 'CIRCLE',
	formSize: 11,
	xEntrySpace: 10,
	yEntrySpace: 5,
	wordWrapEnabled: true,
};

const setLeaveRangeAxisX = (dates) => ({
	valueFormatter: dates,
	position: 'BOTTOM',
	drawGridLines: false,
	axisLineColor: processColor('#BBBBBB'),
	textSize: 11,
	fontFamily: 'Montserrat-Regular',
});

const setLeaveRangeAxisY = (totals) => ({
	left: {
		enabled: true,
		drawGridLines: true,
		gridColor: processColor('#F1F1F1'),
		axisLineColor: processColor('#BBBBBB'),
		axisMinimum: 0,
		axisMaximum: Math.max(...totals) + 1,
		textSize: 11,
		fontFamily: 'Montserrat-Regular',
	},
	right: { enabled: false },
});

const setLeaveRangeDataLine = (totals) => ({
	dataSets: [
		{
			values: totals,
			label: '',
			config: {
				fillGradient: {
					colors: [processColor('#9BDDFF'), processColor('#9BDDFF')],
					positions: [0, 0.3],
					angle: 90,
					orientation: 'TOP_BOTTOM',
				},
				lineWidth: 0,
				color: processColor('transparent'),
				drawCircles: false,
				drawFilled: true,
				fillAlpha: 255,
				drawValues: false,
			},
		},
	],
});

export const setStaffLeaveReportXAxisBar = (length) => ({
	valueFormatter: [''],
	position: 'BOTTOM',
	drawGridLines: false,
	axisLineColor: processColor('#BBBBBB'),
	axisMaximum: length,
	axisMinimum: 0,
});

export const setStaffLeaveReportYAxisBar = {
	left: {
		enabled: true,
		drawGridLines: true,
		gridColor: processColor('#F1F1F1'),
		axisLineColor: processColor('#BBBBBB'),
		axisMinimum: 0,
		textSize: 11,
		fontFamily: 'Montserrat-Regular',
	},
	right: { enabled: false },
};

export const setStaffLeaveReportDataBar = (dataSets) => ({
	dataSets: dataSets,
	config: {
		barWidth: 0.85,
		group: {
			fromX: 0,
			groupSpace: 0.1,
			barSpace: 0.15,
		},
	},
});

export const defaultStaffLeaveReportDataSet = {
	values: [0],
	label: '',
	staffList: [],
	config: {
		drawValues: false,
		colors: [processColor(colorArray[0])],
	},
};

export const chartStyles = {
	marker,
	legendBar,
	defaultStaffLeaveReportDataSet,
	setLeaveRangeAxisX,
	setLeaveRangeAxisY,
	setLeaveRangeDataLine,
	setStaffLeaveReportXAxisBar,
	setStaffLeaveReportYAxisBar,
	setStaffLeaveReportDataBar,
};
