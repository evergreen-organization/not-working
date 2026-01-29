import React, { useEffect } from 'react';
import { fetchComplianceStatus, getTraining } from 'stores';
import { useDispatch, useSelector } from 'react-redux';
import { showFailure } from 'utils';
import { TrainingWidgetView } from './component';
import { showFestive } from 'constant';
import { FestiveTrainingWidgetView } from './componetFestive';

export const TrainingWidget = ({ onPress }) => {
	const dispatch = useDispatch();

	const { eLearning, classroom, digital, complied, pending } = useSelector(getTraining);

	useEffect(() => {
		(async () => getTrainingDetails())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getTrainingDetails = async () => {
		const { payload } = await dispatch(fetchComplianceStatus());
		if (payload.problem) {
			return showFailure(payload.problem);
		}
	};

	const props = {
		onPress,
		eLearning,
		classroom,
		digital,
		complied,
		pending,
	};

	if (showFestive) {
		return <FestiveTrainingWidgetView {...props} />;
	}
	return <TrainingWidgetView {...props} />;
};
