import {
	sumProductCountByStatus,
	filterLG360ProspectByStatus,
	formatJSONObject,
	formatLeadInformationDate,
	formatStaffId,
	getLatestDate,
	getReportingStartEndDate,
	searchProspect,
	toTitleCase,
	findProductName,
	formatProspectSectionList,
	filterProspectByName,
	filterProspectByDateCreated,
} from '../utils/lg360Utils';
import Moment from 'moment';
import {
	emptyFilteredProspectListByStatus,
	filteredProspectList,
	filteredProspectListByStatusList,
	formattedJSONObject,
	formattedJSONObjectNull,
	JSONString,
	JSONStringNull,
	latestDate,
	createdProductList,
	prospect,
	prospectList,
	searchText,
	statusCountSummary,
	productList,
	formattedProspectSectionList,
	prospectListWithRandomNameNickname,
	sortedProspectListByNameNickname,
	prospectListWithRandomDateCreated,
	sortedProspectListWithDateCreated,
} from './testData';

test('LeadGen - format staff id to 5 digits', () => {
	expect(formatStaffId('96999')).toBe('96999');
	expect(formatStaffId('6999')).toBe('06999');
	expect(formatStaffId('999')).toBe('00999');
	expect(formatStaffId('1')).toBe('00001');
});

test('LeadGen - generate reporting week', () => {
	const date = Moment('2023-03-20', 'YYYY-MM-DD');
	const sameStartDay = Moment('2023-03-09', 'YYYY-MM-DD');
	expect(getReportingStartEndDate(date)).toEqual({
		startDate: '2023-03-16',
		endDate: '2023-03-20',
	});
	expect(getReportingStartEndDate(sameStartDay)).toEqual({
		startDate: '2023-03-09',
		endDate: '2023-03-09',
	});
	expect(getReportingStartEndDate('2023-03-01')).toEqual({
		startDate: '2023-03-01',
		endDate: '2023-03-01',
	});
});

test('LeadGen - format string to title case  ', () => {
	expect(toTitleCase('APPOINTMENT MADE')).toBe('Appointment Made');
	expect(toTitleCase('aPPoINTMENT mADE')).toBe('Appointment Made');
});

test('LeadGen - format prospect lead information date', () => {
	expect(formatLeadInformationDate('3/9/2023 12:00:00')).toBe('09/03/2023');
});

test('LeadGen - search prospect by name and nickname', () => {
	expect(searchProspect(prospectList, searchText)).toEqual(
		expect.arrayContaining(filteredProspectList),
	);
});

test('LeadGen - get the latest date from the prospect product list', () => {
	expect(getLatestDate(createdProductList)).toBe(latestDate);
});

test('LeadGen - format JSON object', () => {
	expect(formatJSONObject(JSONString)).toEqual(formattedJSONObject);
	expect(formatJSONObject(JSONStringNull)).toEqual(formattedJSONObjectNull);
	expect(formatJSONObject(null)).toEqual(formattedJSONObjectNull);
});

test('LeadGen - calculate total status amount', () => {
	expect(sumProductCountByStatus(prospect)).toEqual(statusCountSummary);
});

test('LeadGen - filter prospect by status', () => {
	expect(filterLG360ProspectByStatus(prospect, 'A<20')).toEqual(
		expect.arrayContaining(filteredProspectListByStatusList),
	);
	expect(filterLG360ProspectByStatus(prospect, 'I')).toEqual(
		expect.arrayContaining(emptyFilteredProspectListByStatus),
	);
});

test('LeadGen - get product name by product code', () => {
	const productName = 'COMMERCIAL CARD';
	expect(findProductName({ productCode: '2', productList: productList })).toBe(
		productName,
	);
});

test('LeadGen - format prospect list', () => {
	expect(formatProspectSectionList(prospect)).toEqual(
		expect.arrayContaining(formattedProspectSectionList),
	);
});

test('LeadGen - sort prospect list by name', () => {
	expect(filterProspectByName(prospectListWithRandomNameNickname)).toEqual(
		expect.arrayContaining(sortedProspectListByNameNickname),
	);
});

test('LeadGen - sort prospect list by date created', () => {
	expect(
		filterProspectByDateCreated(prospectListWithRandomDateCreated),
	).toEqual(expect.arrayContaining(sortedProspectListWithDateCreated));
});
