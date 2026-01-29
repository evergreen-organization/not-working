import * as Yup from 'yup';
import { maxLength_IC } from './constant';

const alphanumericRegex = /^[a-zA-Z0-9]*$/;
const numericRegex = /^\d*$/;

const identificationNumberInvalidMessage = 'Only alphanumeric are allow';
const referralStaffIdInvalidMessage = 'Staff ID is not valid';
const salesPersonnelStaffIdInvalidMessage = 'Sales Personnel ID is not valid';

export const ICValidationSchema = Yup.object().shape({
	idNo: Yup.string()
		.required('Identification No. is required')
		.max(maxLength_IC)
		.label('Identification Number')
		.matches(alphanumericRegex, identificationNumberInvalidMessage),
});

export const leadCheckValidationSchema = Yup.object().shape({
	name: Yup.string()
		.required('Customer Name is required')
		.max(50)
		.label('Customer Name'),
	contactNo: Yup.string()
		.required('Contact No. is required')
		.matches(numericRegex, 'Contact No. is not valid')
		.label('Contact No.'),
	productInterested: Yup.number().required(
		'Products & Services Interested is required',
	),
});

export const newLeadDetailsValidationSchema = Yup.object().shape({
	dateInterested: Yup.string().ensure().required('Date interested is required'),
	brDeptCode: Yup.string().required('Preferred Branch is required'),
	referralStaffNo: Yup.string()
		.required('Staff ID is required')
		.min(5, 'Staff ID must be at least 5 digits')
		.max(5, 'Staff ID must be at least 5 digits')
		.matches(numericRegex, referralStaffIdInvalidMessage)
		.label('Staff ID'),
	referralBranchDeptCode: Yup.string()
		.required('Staff Region/Branch/Department is required')
		.nullable(),
	salesPersonStaffNo: Yup.string().required(
		'Preferred Sales Personnel is required',
	),
	salesPersonnelID: Yup.string()
		.min(5, 'Sales Personnel ID must be at least 5 digits')
		.max(5, 'Sales Personnel ID must be at least 5 digits')
		.matches(numericRegex, salesPersonnelStaffIdInvalidMessage),
});
