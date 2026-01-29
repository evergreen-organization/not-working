import Moment from 'moment';

export const getMinDate = (dateType, selectedDate) => {
	if (dateType === 'from') {
		return null;
	}

	return Moment(selectedDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
};

export const getMaxDate = (dateType, selectedTravelType) => {
	if (!selectedTravelType) {
		return null;
	}

	if (dateType !== 'from') {
		return null;
	}

	return (
		selectedTravelType === 'Domestic'
			? Moment().add(14, 'days')
			: Moment().add(3, 'months')
	).format('YYYY-MM-DD');
};

export const getStateNameById = (stateId, stateList) => {
	const filteredState = stateList.find((item) => item.stateId === stateId);
	return filteredState === undefined ? '' : filteredState.name;
};
