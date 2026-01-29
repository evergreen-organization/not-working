import {
	PENDING,
	PENDING_LESS_20_DAYS,
	PENDING_MORE_20_DAYS,
} from './constant';
import Moment from 'moment';
import _ from 'lodash';

const BACKEND_DATE_TIME = 'M/D/YYYY HH:mm:ss';
const DATE_DISPLAY = 'DD/MM/YYYY';

const today = Moment().toDate();

export const formatLeadInformationDate = (date) =>
	Moment(date, BACKEND_DATE_TIME).format(DATE_DISPLAY);
export const searchProspect = (prospect, text) => {
	return prospect.filter(
		(item) =>
			item.name?.toLowerCase().includes(text.toLowerCase()) ||
			item.nickName?.toLowerCase().includes(text.toLowerCase()),
	);
};

export const getLatestDate = (list) => {
	return Moment(
		Math.max(
			...list.map((item) =>
				Moment(item.dateCreated, 'M/D/YYYY hh:mm:ss').toDate(),
			),
		),
	).format();
};
export const formatProspectSectionList = (prospects) => {
	const sectionList = prospects?.map((item) => ({
		data: _.orderBy(item.products, 'dateCreated', 'desc'),
		latestDateCreated: getLatestDate(item.products),
		...item,
	}));
	return sectionList;
};

export const toTitleCase = (str) =>
	str.replace(
		/(^\w|\s\w)(\S*)/g,
		(_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
	);

export const formatJSONObject = (data) => {
	if (!data) {
		return null;
	}
	const object = JSON.parse(data);
	if (!object) {
		return null;
	}
	/* remove null, undefined and empty values from object */
	return Object.entries(object).reduce(
		(a, [k, v]) => (v ? ((a[k] = v), a) : a),
		{},
	);
};

export const sumProductCountByStatus = (prospects) => {
	/* Loop prospects -> product to sum product count by status*/
	return prospects.reduce((statusCount, { products }) => {
		products.forEach(({ status, dateCreated }) => {
			/* Format pending status to < 20 or > 20 days */
			const newStatus = formatPendingStatus(status, dateCreated);
			/* Add 1 count for each status */
			statusCount[newStatus] = (statusCount[newStatus] || 0) + 1;
		});
		return statusCount;
	}, {});
};

/* Format pending status to < 20 or > 20 days */
const formatPendingStatus = (status, dateCreated) => {
	if (status != PENDING) {
		return status;
	}
	const differenceDay = Moment().diff(Date.parse(dateCreated), 'days');
	return differenceDay < 20 ? PENDING_LESS_20_DAYS : PENDING_MORE_20_DAYS;
};

export const filterLG360ProspectByStatus = (data, status) => {
	const filtered = data.flatMap((item) => {
		const filteredData = item.products.filter(
			(x) => status === formatPendingStatus(x.status, x.dateCreated),
		);
		return filteredData.length > 0 ? { ...item, data: filteredData } : [];
	});
	return filtered;
};

export const formatStaffId = (staffId) => staffId.toString().padStart(5, '0');

export const getReportingStartEndDate = (date) => {
	const dateFormat = 'YYYY-MM-DD';

	/* Condition for week start day */
	const startDateLookupTable = [
		{ value: 23, condition: (number) => number >= 23 },
		{ value: 16, condition: (number) => number >= 16 },
		{ value: 9, condition: (number) => number >= 9 },
		{ value: 1, condition: (number) => number >= 1 },
	];

	/* Find Start date based on condition */
	const day = Moment(date).format('D');
	const foundDate = startDateLookupTable.find((item) =>
		item.condition(day),
	) ?? { value: 1 };

	/* Return start and end date */
	return {
		startDate: Moment(date).set('date', foundDate.value).format(dateFormat),
		endDate: Moment(date).format(dateFormat),
	};
};

export const findProductName = ({ productCode, productList }) =>
	productList.find((item) => item.productCode === productCode)?.productName;

export const filterProspectByName = (list) =>
	_.sortBy(list, (x) =>
		x.name ? [x.name.toLowerCase(), x.nickName] : x.nickName.toLowerCase(),
	);

export const filterProspectByDateCreated = (list) =>
	_.orderBy(list, 'latestDateCreated', 'desc');
