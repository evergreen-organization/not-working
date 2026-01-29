import React from 'react';
import { EBizCardSettingsComp } from './component';
import { EBizHomePropsType } from './types';
import { CUSTOMIZE_SETTINGS_OPTIONS } from '../constant/constant';

export const EBizCardSettings = ({ navigation }) => {
	const settingList = CUSTOMIZE_SETTINGS_OPTIONS;
	function handleGoBack() {
		navigation.goBack();
	}

	function handleNavigation(route: string) {
		navigation.navigate(route);
	}

	const props: EBizHomePropsType = {
		settingList,
		handleGoBack,
		handleNavigation,
	};
	return <EBizCardSettingsComp {...props} />;
};
