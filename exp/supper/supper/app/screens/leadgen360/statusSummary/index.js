import React, { useEffect, useState } from 'react';
import { LG360StatusSummaryView } from './component';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProspect, getLeadGen, getProspects } from 'stores';
import { filterLG360ProspectByStatus, PENDING_LESS_20_DAYS } from '../utils';
import { useNavigation } from '@react-navigation/native';

export const LG360StatusSummary = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { statusStatistic, status } = useSelector(getLeadGen);
	const formattedProspect = useSelector(getAllProspect);
	const [selectedStatus, setSelectedStatus] = useState(PENDING_LESS_20_DAYS);
	const [filteredProspects, setFilteredProspects] = useState([]);

	useEffect(() => {
		getProspectByStatus();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getProspectByStatus = () => {
		dispatch(getProspects());
		filterProspectsByStatus(selectedStatus);
	};
	const handleStatusChipPress = (statusItem) => {
		setSelectedStatus(statusItem.status);
		filterProspectsByStatus(statusItem.status);
	};

	const filterProspectsByStatus = (status) => {
		const filtered = filterLG360ProspectByStatus(formattedProspect, status);
		setFilteredProspects(filtered);
	};

	const handleBack = () => navigation.goBack();

	const props = {
		getProspectByStatus,
		handleStatusChipPress,
		handleBack,
		statusStatistic,
		status,
		filteredProspects,
		selectedStatus,
	};

	return <LG360StatusSummaryView {...props} />;
};
