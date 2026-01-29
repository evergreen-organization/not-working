import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, Space, Text } from 'atoms';
import { colors, gradientColors } from 'configs';
import { AnimatedScaleView, Avatar } from 'molecules';

import { festiveStyles, styles } from './styles';

export const FestiveHomeHeaderView = ({
	onVolumePress,
	handleLogout,
	handleNavigateToProfile,
	scrollHandler,
	animatedStyle,
	name,
	avatarImage,
	children,
	isBgmMute,
}) => {
	const insets = useSafeAreaInsets();

	const renderHeader = (borderBottomWidth = 0) => {
		return (
			<LinearGradient
				// colors={gradientColors.tertiary}
				colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.5)']}
				style={[
					festiveStyles.background,
					{
						paddingTop: insets.top,
						borderBottomWidth: borderBottomWidth,
					},
				]}
			>
				<View style={[festiveStyles.avatarContainer]}>
					<Avatar
						preset={'image'}
						containerStyle={[{ backgroundColor: colors.white, marginBottom: 5 }]}
						source={avatarImage}
						rounded
						size={35}
						onPress={handleNavigateToProfile}
					/>
				</View>
				<Space width={10} />
				<Text variant={'H6'} numberOfLines={1} style={festiveStyles.nameText}>
					{name}
				</Text>
				<AnimatedScaleView
					testID={'logoutButton'}
					onPress={handleLogout}
					onLongPress={handleLogout}
				>
					<Icon
						type="font-awesome-5"
						name="sign-out-alt"
						style={[styles.signOut, { color: colors.white }]}
					/>
				</AnimatedScaleView>
				{/* <MusicController isBgmMute={isBgmMute} onVolumePress={onVolumePress} /> */}
			</LinearGradient>
		);
	};

	return (
		<View style={festiveStyles.container}>
			<Animated.View style={[festiveStyles.animatedView, animatedStyle]}>
				{renderHeader(0.33)}
			</Animated.View>
			<Animated.ScrollView
				testID={'home-scroll-view'}
				showsVerticalScrollIndicator={false}
				bounces={false}
				scrollEventThrottle={1}
				onScroll={scrollHandler}
			>
				{renderHeader()}
				{children}
			</Animated.ScrollView>
		</View>
	);
};
