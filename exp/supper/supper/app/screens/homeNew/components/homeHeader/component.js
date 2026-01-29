import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Icon, Space, Text } from 'atoms';
import { colors } from 'configs';
import { AnimatedScaleView, Avatar } from 'molecules';

import { styles } from './styles';

export const HomeHeaderView = ({
	handleLogout,
	handleNavigateToProfile,
	scrollHandler,
	animatedStyle,
	name,
	avatarImage,
	children,
}) => {
	const insets = useSafeAreaInsets();

	const renderHeader = (backgroundColor = [colors.white, colors.white], borderBottomWidth = 0) => {
		return (
			<LinearGradient
				colors={backgroundColor}
				style={[
					styles.background,
					{
						paddingTop: insets.top,
						borderBottomWidth: borderBottomWidth,
					},
				]}
			>
				<View style={{ marginLeft: -2 }}>
					<Avatar
						preset={'image'}
						containerStyle={[{ backgroundColor: colors.white }]}
						source={avatarImage}
						rounded
						size={35}
						onPress={handleNavigateToProfile}
					/>
				</View>
				<Space width={10} />
				<Text variant={'H6'} numberOfLines={1} style={styles.nameText}>
					{name}
				</Text>
				<AnimatedScaleView
					testID={'logoutButton'}
					onPress={handleLogout}
					onLongPress={handleLogout}
				>
					<Icon type="font-awesome-5" name="sign-out-alt" style={styles.signOut} />
				</AnimatedScaleView>
			</LinearGradient>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Animated.View style={[styles.animatedView, animatedStyle]}>
				{renderHeader(colors.whiteLinear, 0.33)}
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
