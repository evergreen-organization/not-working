import { Alert } from 'react-native';
import React, { useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { AVATAR_PACK, showFestive, USER_ANALYTICS } from 'constant';
import { getAvatar, getModulesAvailable, logout } from 'stores';
import { addAnalyticCheckpoint } from 'utils';

import UserView from './component';
import UserViewFestive from './componentFestive';

export const UserMain = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();
	const viewRef = useRef();
	const user = useSelector((state) => state.user);
	const avatar = useSelector(getAvatar);
	const { adid } = useSelector(getModulesAvailable);
	const { image: avatarImage } = AVATAR_PACK.find((av) => av.id === avatar.image) || {
		image: AVATAR_PACK[0],
	};

	const analyticConfig = {
		dispatch,
		module: USER_ANALYTICS.MODULES.PROFILE,
		view: viewRef,
	};

	const handleLogout = () => {
		Alert.alert(
			'Log Out',
			'Are you sure you want to log out?',
			[
				{
					text: 'Cancel',
				},
				{
					text: 'Log Out',
					onPress: () => {
						dispatch(logout());
					},
					style: 'destructive',
				},
			],
			{ cancelable: false },
		);
	};

	const onNavigate = async (path, event) => {
		const profileConfig = {
			screen: USER_ANALYTICS.PROFILE_SCREENS.USER,
			buttonEvent: event.nativeEvent,
			action: path,
		};
		await addAnalyticCheckpoint({ ...analyticConfig, ...profileConfig });
		navigation.navigate(path);
	};

	const props = {
		handleLogout,
		user,
		avatarImage,
		insets,
		adid,
		onNavigate,
	};

	if (showFestive) {
		return <UserViewFestive {...props} ref={viewRef} />;
	}
	return <UserView {...props} ref={viewRef} />;
};
