import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { getInterstate, fetchOutstationDeclaration } from 'stores';
import { LOADING } from 'constant';
import { showFailure } from 'utils';
import routes from '../../../navigations/routes';

import { TravelDeclarationListComp } from './component';

export const TravelDeclarationList = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const { outstationList, loadingOutstationList } = useSelector(getInterstate);

	useFocusEffect(
		useCallback(() => {
			(async () => await getAllOutstationList())();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	);

	const getAllOutstationList = async () => {
		const { payload } = await dispatch(fetchOutstationDeclaration());
		if (payload.problem) {
			showFailure(payload.problem);
		}
	};

	const NotNullOrWhiteSpaces = (value) => {
		if (value) {
			return value.trim() !== '';
		}

		return false;
	};

	const handleNavigateToForm = () => {
		navigation.navigate(routes.INTERSTATE_FORM);
	};

	const props = {
		handleNavigateToForm,
		NotNullOrWhiteSpaces,
		outstationList,
		isLoading: loadingOutstationList === LOADING,
	};

	return <TravelDeclarationListComp {...props} />;
};
