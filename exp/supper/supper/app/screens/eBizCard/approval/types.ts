import { ImageSourcePropType } from 'react-native';

export interface ChangeRequestTransactionType {
	transactionType: string;
	original: {
		profileImage?: ImageSourcePropType;
		branchTel?: string;
		mobileNumber?: string;
		email?: string;
		branchAddress?: string;
		notes?: string;
		nickname?: string;
	};
	changes: {
		profileImage?: ImageSourcePropType;
		branchTel?: string;
		mobileNumber?: string;
		email?: string;
		branchAddress?: string;
		notes?: string;
		nickname?: string;
	};
}

export interface FormattedChangeRequestTransactionType {
	updatedValues: {
		key: string;
		label: string;
		prevValue: string | ImageSourcePropType;
		updatedValue: string | ImageSourcePropType;
	}[];
	unChangedValues: {
		key: string;
		label: string;
		prevValue: string | ImageSourcePropType;
	}[];
}
export interface ChangeRequestType {
	name: string;
	profileImage?: ImageSourcePropType;
	transaction: ChangeRequestTransactionType[];
}

export interface EBizNotificationType {
	handleGoBack: () => {} | void;

	handleChangesItemPress: (ChangeRequestType) => {} | void;
	changeRequestData: ChangeRequestType[];
}

export interface ChangeRequestListType {
	handleGoBack: () => {} | void;
	handleRequestPress: (ChangeRequestTransactionType) => {} | void;
	request: ChangeRequestType;
}

export interface ApprovalDetailsType {
	handleGoBack: () => {} | void;
	handleApproval: () => {} | void;
	transaction: ChangeRequestTransactionType;
	formattedChangesValues: FormattedChangeRequestTransactionType;
}
