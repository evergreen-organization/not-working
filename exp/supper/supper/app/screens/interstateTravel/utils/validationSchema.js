import * as Yup from 'yup';
import moment from 'moment';

const specialCharsErrorMsg = 'Special characters are not allowed.';
const minLengthErrorMsg = 'A minimum input of 3 characters are required.';
const countryStringErrorMsg =
	'First character must be alphabet.\nSpecial characters and numbers are not allowed.';
const otherRemarksErrorMsgForCity =
	'If "Others" is selected as city, please elaborate and provide further details.';
const otherRemarksErrorMsgForPurpose =
	'If "Others" is selected as purpose of travel, please elaborate and provide further details.';
const domesticMaxFromDateErrorMsg =
	'Interstate Declaration of 14 days in advance is not allowed.';
const internationalMaxFromDateErrorMsg =
	'International Declaration of 3 months in advance is not allowed.';

const alphaNumericRegex = /^[a-z\d\s]+$/i;
const countriesFieldRegex = /^[a-z\s,./]+$/i;

export const travelDeclarationValidationSchema = Yup.object().shape({
	travelType: Yup.string().required('Travel Type is required.'),
	fromDate: Yup.date()
		.default(() => new Date())
		.when('travelType', {
			is: 'Domestic',
			then: Yup.date().test(
				'domestic_max_days_test',
				domesticMaxFromDateErrorMsg,
				function (value) {
					return value.getTime() < moment().add(14, 'days');
				},
			),
		})
		.when('travelType', {
			is: 'International',
			then: Yup.date().test(
				'international_max_days_test',
				internationalMaxFromDateErrorMsg,
				function (value) {
					return value.getTime() < moment().add(3, 'months');
				},
			),
		})
		.required('From date is required'),
	toDate: Yup.date()
		.min(Yup.ref('fromDate'), 'To date cannot be before From date')
		.required('To date is required'),
	stateId: Yup.string().when('travelType', {
		is: 'Domestic',
		then: Yup.string().required('State is required.'),
	}),
	cityName: Yup.string().when('travelType', {
		is: 'Domestic',
		then: Yup.string().required('City is required.'),
	}),
	continent: Yup.string().when('travelType', {
		is: 'International',
		then: Yup.string().required('Continent is required.'),
	}),
	country: Yup.string().when('travelType', {
		is: 'International',
		then: Yup.string()
			.required('Country is required.')
			.matches(countriesFieldRegex, countryStringErrorMsg),
	}),
	remarks: Yup.string().required('Purpose is required.'),
	otherRemarks: Yup.string()
		.when('cityName', {
			is: 'Others',
			then: Yup.string()
				.trim()
				.required(otherRemarksErrorMsgForCity)
				.min(3, minLengthErrorMsg),
		})
		.when('remarks', {
			is: 'Others',
			then: Yup.string()
				.trim()
				.required(otherRemarksErrorMsgForPurpose)
				.min(3, minLengthErrorMsg),
		})
		.matches(alphaNumericRegex, specialCharsErrorMsg),
});
