import CompleteIcon from 'assets/icon/checked.png';
import FailIcon from 'assets/icon/failed.png';
import WarningIcon from 'assets/icon/warning-2.png';
import PendingIcon from 'assets/icon/pending.png';
import { colors } from 'configs';
export const maxLength_IC = 20;
export const countryCode = '0';
export const eConsentUrl = 'apply.pbebank.com/econsent';

export const LOADING = 'loading';
export const FOUND = 'found';
export const EMPTY = 'empty';
export const IDLE = 'idle';

export const checkICButtonStyle = {
	[LOADING]: { label: 'Searching for Record', color: colors.shadow },
	[FOUND]: { label: 'Record Found', color: colors.green },
	[EMPTY]: { label: 'Record Not Found', color: colors.shadow },
	[IDLE]: { label: 'Check Database', color: colors.primary },
};

/*PRODUCT STATUS CONSTANT*/
export const LEAD_CREATED = 'C';
export const PENDING = 'A';
export const PENDING_LESS_20_DAYS = 'A<20';
export const PENDING_MORE_20_DAYS = 'A>20';
export const REJECTED = 'R';
export const INACTIVE = 'I';
export const ERROR_PUSHED = 'E';
export const PURGED = 'P';

export const PRODUCT_STATUS = {
	[LEAD_CREATED]: {
		title: 'Lead Created',
		status: LEAD_CREATED,
		image: CompleteIcon,
		color: colors.lightGreen,
		borderColor: colors.brightGreen,
		statusDateTitle: 'Update Date & Time',
	},
	[PENDING]: {
		title: 'Pending',
		status: PENDING,
		image: PendingIcon,
		color: colors.lightBlue,
		borderColor: colors.brightBlue,
		statusDateTitle: 'Date Updated',
	},
	[PENDING_LESS_20_DAYS]: {
		title: 'Pending eConsent < 20 days',
		status: PENDING_LESS_20_DAYS,
		image: PendingIcon,
		color: colors.lightBlue,
		borderColor: colors.brightBlue,
	},
	[PENDING_MORE_20_DAYS]: {
		title: 'Pending eConsent > 20 days',
		status: PENDING_MORE_20_DAYS,
		image: PendingIcon,
		color: colors.lightBlue,
		borderColor: colors.brightBlue,
	},
	[REJECTED]: {
		title: 'Rejected',
		status: REJECTED,
		image: FailIcon,
		color: colors.lightRed,
		borderColor: colors.brightRed,
		statusDateTitle: 'Date Rejected',
	},
	[ERROR_PUSHED]: {
		title: 'Failed',
		status: ERROR_PUSHED,
		image: FailIcon,
		color: colors.lightRed,
		borderColor: colors.brightRed,
		statusDateTitle: 'Date Rejected',
	},
	[PURGED]: {
		title: 'Purged',
		status: PURGED,
		image: FailIcon,
		color: colors.lightRed,
		borderColor: colors.brightRed,
		statusDateTitle: 'Date Purged',
	},
	[INACTIVE]: {
		title: 'Inactive',
		status: INACTIVE,
		image: WarningIcon,
		color: colors.lightYellow,
		borderColor: colors.brightYellow,
		statusDateTitle: 'Date Inactive',
	},
};

export const PRODUCT_STATUS_LIST = [
	PRODUCT_STATUS[PENDING_LESS_20_DAYS],
	PRODUCT_STATUS[PENDING_MORE_20_DAYS],
	PRODUCT_STATUS[INACTIVE],
	PRODUCT_STATUS[REJECTED],
];

export const LABELS = {
	product: 'Product',
	amount: 'Amount',
	dateInterested: 'Date Interested',
	preferredBranch: 'Preferred Branch',
	dateCreated: 'Date Created',
	statusDate: 'Status Date',
};

export const RESPONSE_FROM_CRMA2 = {
	salesPerson: 'Sales Personnel (by Branch)',
	responseStatus: 'Response Status',
};

/* Branch */
export const BRANCH_LABEL = 'brDeptName';
export const BRANCH_VALUE = 'brDeptCode';

/* Referral Branch */
export const REFERRAL_BRANCH_LABEL = 'regBrDeptName';
export const REFERRAL_BRANCH_VALUE = 'regBrDeptCode';

/* PRODUCT */
export const PRODUCT_LABEL = 'productName';
export const PRODUCT_VALUE = 'productCode';

/* SALES PERSONNEL */
export const SALES_PERSONNEL_LABEL = 'name';
export const SALES_PERSONNEL_VALUE = 'staffNo';

export const SYSTEM_AUTO_ASSIGN = {
	name: 'System Auto Assign',
	staffNo: '',
	fieldValue: '00000',
};

export const REFERRAL_NOT_FOUND_MESSAGE = 'Referral Staff ID Not Found.';

export const PRODUCT_INTERESTED_MESSAGE =
	'To check any duplicated / existing product/service interested by customer in CRMA2';

export const GET_SALES_PERSONNEL_ERROR_MESSAGE =
	'Failed to get active sales personnel list. Please try again later.';

export const VERIFY_IC_MESSAGE = "To check if the customer is existed in CRMA2's record";

export const PENDING_E_CONSENT_SHARE_MESSAGE = (referralCode) =>
	`Your unique Referral Code is ${referralCode}. Please visit Public Bank's official website at "PBe > Contact > Public Bank Customer Referral eConsent Form" to provide your eConsent by indicating the "Referral Code" to enable our representative to contact you.`;
