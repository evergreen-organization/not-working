import { colorArray } from '../constant';
import { processColor } from 'react-native';

export const STAFF_LEAVE_REPORT_DATA = [
	{
		groupName: 'COMPUTER SUPPORT OFFICER',
		staffs: [
			{
				name: 'UAT-10006',
				staffNo: '10006',
			},
		],
	},
	{
		groupName: 'SENIOR MANAGER',
		staffs: [
			{
				name: 'NASRUDIN BIN SALLEH',
				staffNo: '28844',
			},
		],
	},
];

export const STAFF_LEAVE_REPORT_LEGEND = [
	{
		label: 'COMPUTER SUPPORT OFFICER',
		color: '#9BDDFF',
	},
	{
		label: 'SENIOR MANAGER',
		color: '#85CDFF',
	},
];

export const FORMATTED_STAFF_LEAVE_REPORT_DATA = [
	{
		values: [1],
		label: 'COMPUTER SUPPORT OFFICER',
		staffList: [
			{
				name: 'UAT-10006',
				staffNo: '10006',
			},
		],
		config: {
			drawValues: false,
			colors: [processColor(colorArray[0])],
		},
	},
	{
		values: [1],
		label: 'SENIOR MANAGER',
		staffList: [
			{
				name: 'NASRUDIN BIN SALLEH',
				staffNo: '28844',
			},
		],
		config: {
			drawValues: false,
			colors: [processColor(colorArray[1])],
		},
	},
];
