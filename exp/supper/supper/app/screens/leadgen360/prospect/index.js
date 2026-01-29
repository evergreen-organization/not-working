import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllLeadGenProducts,
	getAllProspect,
	getLeadGen,
	getProducts,
	getProspects,
	verifyCustomerProduct,
} from 'stores';
import { routes } from 'navigations';

import LG360ProspectScreen from './componet';
import {
	filterProspectByDateCreated,
	filterProspectByName,
	searchProspect,
} from '../utils';
import { addAnalyticCheckpoint, showFailure } from 'utils';
import { USER_ANALYTICS } from 'constant';

export const LG360Prospect = ({ navigation }) => {
	const dispatch = useDispatch();
	const viewRef = useRef();
	const { prospectStatus } = useSelector(getLeadGen);
	const prospects = useSelector(getAllProspect);
	const products = useSelector(getAllLeadGenProducts);
	const [searchInput, setSearchInput] = useState('');
	const [filteredProspect, setFilteredProspect] = useState(prospects);
	const [isProductPopUpVisible, setIsProductPopUpVisible] = useState(false);
	const [currentProspect, setCurrentProspect] = useState({});
	const [isSortByName, setIsSortByName] = useState(true);

	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.LEADGEN360,
		view: viewRef,
	};

	useEffect(() => {
		(async () => {
			await dispatch(getProspects());
			await dispatch(getProducts());
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		sortProspectList(prospects, isSortByName);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [prospects]);

	const sortProspectList = (list, sortByName) =>
		sortByName
			? setFilteredProspect(filterProspectByName(list))
			: setFilteredProspect(filterProspectByDateCreated(list));
	const handleTextClear = (_) => {
		setSearchInput('');
		sortProspectList(prospects, isSortByName);
	};

	const handleTextChange = (text) => {
		setSearchInput(text);
		if (!text) {
			return sortProspectList(prospects, isSortByName);
		}
		const searchedProspect = searchProspect(prospects, text);
		sortProspectList(searchedProspect, isSortByName);
	};

	const handleSortTypeChange = (_) => {
		setIsSortByName(!isSortByName);
		sortProspectList(filteredProspect, !isSortByName);
	};

	const handleNewLeadAdd = async (event) => {
		const addNewLeadConfig = {
			screen: USER_ANALYTICS.LEADGEN360_SCREENS.PROSPECT,
			buttonEvent: event.nativeEvent,
			action: USER_ANALYTICS.LEADGEN360_ACTIONS.CREATE_NEW_LEAD,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...addNewLeadConfig });
		navigation.navigate(routes.LG360_NEW_LEAD);
	};
	const handleAddNewProduct = ({ section }) => {
		setIsProductPopUpVisible(true);
		setCurrentProspect(section);
	};
	const handleCloseModal = (_) => setIsProductPopUpVisible(false);

	const handleRefresh = () => dispatch(getProspects());

	const handleSelectNewProduct = async (item) => {
		const { name, contactNo, customerAliasId, nickName } = currentProspect;
		const { payload } =
			(await dispatch(
				verifyCustomerProduct({
					name: name ?? nickName,
					contactNo,
					customerAliasId,
					productCode: item.productCode,
				}),
			)) || {};
		if (payload.problem) {
			return showFailure(payload.problem);
		}
		if (payload.data.exist) {
			return navigation.navigate(routes.LG360_ACKNOWLEDGEMENT);
		}
		navigation.navigate(routes.LG360_NEW_LEAD_DETAILS_FORM, {
			productCode: item.productCode,
			name: name ?? nickName,
			contactNo,
			customerAliasId,
		});
	};

	const handleHeaderLeftBtn = () => navigation.goBack();

	const props = {
		handleCloseModal,
		handleNewLeadAdd,
		handleTextClear,
		handleTextChange,
		handleAddNewProduct,
		handleSelectNewProduct,
		handleRefresh,
		handleSortTypeChange,
		handleHeaderLeftBtn,
		filteredProspect,
		searchInput,
		isProductPopUpVisible,
		prospectStatus,
		products,
		isSortByName,
	};

	return <LG360ProspectScreen {...props} ref={viewRef} />;
};
