import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
	Extrapolate,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

import { getAvatar, logout } from 'stores';
import { AVATAR_PACK, showFestive } from 'constant';
import { routes } from 'navigations';

import { HomeHeaderView } from './component';
import { FestiveHomeHeaderView } from './componentFestive';

const HEADER_HEIGHT = 235;

export const HomeHeader = ({ children, isBgmMute = true, onVolumePress = () => {} }) => {
	const navigation = useNavigation();
	const user = useSelector((state) => state.user);
	const avatar = useSelector(getAvatar);
	const { image: avatarImage } = AVATAR_PACK.find((av) => av.id === avatar.image) || {
		image: AVATAR_PACK[0],
	};
	const dispatch = useDispatch();
	const scrollY = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		const interpolateY = interpolate(
			scrollY.value,
			[-100, HEADER_HEIGHT],
			[-HEADER_HEIGHT, 0],
			Extrapolate.CLAMP,
		);
		return {
			transform: [{ translateY: interpolateY }],
		};
	});

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (e) => {
			scrollY.value = e.contentOffset.y;
		},
	});

	const handleLogout = () => dispatch(logout());
	const handleNavigateToProfile = () => navigation.navigate(routes.PROFILE);

	const props = {
		onVolumePress,
		handleLogout,
		handleNavigateToProfile,
		isBgmMute,
		scrollHandler,
		animatedStyle,
		name: user.name,
		avatarImage,
		children,
	};

	// if (showFestive) {
	return <FestiveHomeHeaderView {...props} />;
	// }
	// return <HomeHeaderView {...props} />;
};
