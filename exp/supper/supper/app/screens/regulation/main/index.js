import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'navigations/routes';
import { showFailure, showInfo } from 'utils/message';
import { FAIL, LOADING } from 'constant';
import { RegulationView } from './component';
import {
	fetchRegulationDetails,
	fetchRegulationList,
	getRegulations,
} from 'stores/regulation';
import { checkLatestRegulation } from 'screens/regulation/main/utils';

export const Regulation = ({ navigation }) => {
	const { regulationList, regulations, status } = useSelector(getRegulations);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => await getRegulation())();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getRegulation = async () => {
		const { payload } = await dispatch(fetchRegulationList());
		if (payload?.problem) {
			return showInfo('Info', 'Please check your internet connection');
		}
	};

	const getDetails = async ({
		cachedRegulationDetail,
		circularId,
		lastUpdateStamp,
	}) => {
		const isFetchRequired = checkLatestRegulation(
			cachedRegulationDetail,
			cachedRegulationDetail?.circularCategoryDetails?.lastUpdateStamp,
			lastUpdateStamp,
		);

		if (!isFetchRequired) {
			return cachedRegulationDetail;
		}

		const { payload } = await dispatch(
			fetchRegulationDetails({ regulationId: circularId, lastUpdateStamp }),
		);

		if (payload?.problem) {
			return false;
		}

		return payload?.data;
	};

	const onRegulationSelect = async ({ circularId, lastUpdateStamp }) => {
		const cachedRegulationDetail = regulations?.find(
			(item) => item?.circularCategoryDetails?.circularId === circularId,
		);

		const regulationDetails = await getDetails({
			cachedRegulationDetail,
			circularId,
			lastUpdateStamp,
		});
		if (!regulationDetails) {
			return showFailure('Error', 'Please try again');
		}
		navigation.navigate(routes.REGULATION_LANDING_PAGE, { regulationDetails });
	};

	const props = {
		onRegulationSelect,
		getRegulation,
		regulationList,
		loading: status === LOADING,
		fail: status === FAIL,
		navigation,
	};

	return <RegulationView {...props} />;
};
