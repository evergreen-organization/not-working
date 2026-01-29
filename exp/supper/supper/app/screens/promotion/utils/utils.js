import Moment from 'moment';

const formatDate = (date) => Moment(date).format('DD MMM YYYY');

export const displayPromoDate = ({ promotionDetails }) => {
	const { promoStartPeriod, promoEndPeriod } = promotionDetails;
	if (!promoStartPeriod && !promoEndPeriod) {
		return null;
	}
	if (promoStartPeriod && promoEndPeriod) {
		return formatDate(promoStartPeriod) + '-' + formatDate(promoEndPeriod);
	}
	return formatDate(promoStartPeriod ?? promoEndPeriod);
};
