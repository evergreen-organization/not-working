import React from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { Image, Platform, View } from 'react-native';
import { ShadowedView } from 'react-native-fast-shadow';

import { Icon, Screen, Space, Text } from 'atoms';
import { Header, ListItem } from 'molecules';
import { colors } from 'configs';
import { Typography } from 'styles';

import { styles } from './styles';
import ComingSoonImg from 'assets/eBizCard/comingSoonTag.png';
import { useSelector } from 'react-redux';
import { getTagLength } from 'stores';

export const EBizCardSettingsComp = ({ handleGoBack, handleNavigation, settingList }) => {
	const badgeCount = useSelector(getTagLength);
	const scrollView = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			'worklet';
			scrollView.value = event.contentOffset.y;
		},
	});

	const renderLeftIcon = (item) => {
		if (item.isComing) {
			return (
				<View style={styles.$comingSoonContainer}>
					<Image source={ComingSoonImg} style={styles.$imgComingSoon} />
				</View>
			);
		}
	};

	const renderRightIcon = (item) => {
		if (item.badgeCount && badgeCount > 0) {
			return (
				<View style={styles.$centerContainer}>
					<View style={styles.$badgeContainer}>
						<Text variant={'P10'} style={{ color: colors.white }}>
							{badgeCount}
						</Text>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.$centerContainer}>
				<Icon type={'material'} name={'keyboard-arrow-right'} style={styles.$arrowRightIcon} />
			</View>
		);
	};

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleGoBack,
				}}
				centerComponent={{
					text: 'Settings/Customization',
					style: Typography.H6,
				}}
			/>

			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				onScroll={scrollHandler}
				scrollEventThrottle={16}
			>
				<View style={styles.$settingSection}>
					{settingList.map((item) => (
						<ShadowedView
							key={item.id}
							style={Platform.OS === 'ios' ? styles.$shadowIosView : styles.$shadowAndroidView}
						>
							<ListItem
								key={item.id}
								onPress={() => handleNavigation(item.route)}
								title={item.title}
								titleStyle={styles.$titleStyle}
								centerStyle={styles.$centerStyle}
								description={item.subHeading}
								descriptionStyle={styles.$descriptionStyle}
								containerStyle={styles.$listContainer}
								leftIcon={item.icon}
								leftIconStyle={styles.$icon}
								LeftComponent={renderLeftIcon(item)}
								RightComponent={renderRightIcon(item)}
							/>
						</ShadowedView>
					))}
				</View>
				<Space height={50} />
			</Animated.ScrollView>
		</Screen>
	);
};
