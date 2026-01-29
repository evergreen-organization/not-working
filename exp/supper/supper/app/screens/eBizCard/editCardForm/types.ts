import { FormikValues } from 'formik';

export interface EBizCardIInfoType {
	name: string;
	company: string;
	title: string;
	branchTel: string;
	mobileNumber: string;
	email: string;
	branchAddress: string;
	dynamicProfile: string;
	notes: string;
}

export interface EditEBizCardFormValuesType {
	name: string;
	nickname: string;
	title: string;
	branchTel: string;
	mobileNumber: string;
	email: string;
	branchAddress: string;
	company: string;
	notes: string;
	dynamicProfile: string;
}

export interface EditCardFormPropsType {
	handleGoBack: () => {} | void;
	handleViewCardInfo: () => {} | void;
	handleSubmit: (item?: EditEBizCardFormValuesType) => void;
	initialValues: FormikValues;
	cardInfo: {};
}
