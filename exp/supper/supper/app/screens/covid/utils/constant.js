import { colors } from 'configs';
import moment from 'moment';

export const REJECTED = 'Rejected';
export const APPROVED = 'Approved';
export const WITHDRAWN = 'Withdrawn';
export const POSITIVE = 'Positive';
export const NEGATIVE = 'Negative';
export const PENDING = 'Pending';

export const COMPLETE_APPROVAL_LABEL = 'complete';
export const PENDING_APPROVAL_LABEL = 'pending';

export const STATUS_TAG_COLOR_SCHEME = {
	[REJECTED]: 'error',
	[WITHDRAWN]: 'default',
	[APPROVED]: 'success',
	[PENDING]: 'warning',
};

export const STATUS_TEXT_COLORS_SCHEME = {
	[POSITIVE]: colors.primary,
	[NEGATIVE]: colors.oldLavender,
	[APPROVED]: colors.green,
	[REJECTED]: colors.primary,
	[WITHDRAWN]: colors.black,
	[PENDING]: colors.brightYellow,
};

export const SELF_TEST_RESULT = [
	{ value: 'P', label: 'Positive' },
	{ value: 'N', label: 'Negative' },
];

export const formatDate = (date) => {
	return moment(date, 'M/D/YYYY HH:mm:ss').format('D MMM YYYY (ddd) h:mm a');
};
