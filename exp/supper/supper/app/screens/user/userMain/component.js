import { PrimaryButton, Space, Text } from 'atoms';
import { colors } from 'configs';
import { Avatar } from 'molecules';
import React, { forwardRef } from 'react';
import { ImageBackground, SafeAreaView, View } from 'react-native';
import Animated, {
	FadeInDown,
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { commonStyles } from 'styles';
import { UserMenuItem as Item } from './components';
import { PROFILE_ITEMS } from './constant';
import { festiveStyles, styles } from './styles';

const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground);

export const UserView = ({ handleLogout, user, avatarImage, insets, adid, onNavigate }, ref) => {
	const scale = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler((e) => {
		scale.value = e.contentOffset.y;
	});

	return (
		<ImageBackground style={[commonStyles.fill]} source={require('assets/60th-anni-bg.png')}>
			<SafeAreaView style={[commonStyles.fill]}>
				<View
					style={[
						festiveStyles.selfCenter,
						commonStyles.center,
						{ marginBottom: 50, marginTop: 30 },
					]}
				>
					<Avatar
						preset="image"
						containerStyle={[{ backgroundColor: colors.white }]}
						source={avatarImage}
						rounded
						size={110}
					/>
					<Text variant={'P9'} style={styles.name}>
						{user.name}
					</Text>
					<Text variant={'P10'} style={styles.id}>
						{user.staffId}
					</Text>
				</View>
				<Animated.ScrollView
					// onScroll={scrollHandler}
					style={styles.bottomContainer}
					showsVerticalScrollIndicator={false}
					// entering={FadeInDown.delay(200)}
				>
					<View style={styles.menuContainer}>
						{PROFILE_ITEMS(adid).map((item) => (
							<Item
								key={item.testID}
								testID={item.testID}
								heading={item.heading}
								subheading={item.subheading}
								onPress={(event) => onNavigate(item.route, event)}
							/>
						))}
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton
							onPress={handleLogout}
							title={'Log Out'}
							buttonStyle={styles.logoutButton}
							style={[styles.logoutButtonContainer]}
							shadowStyle={styles.logoutButtonShadow}
						/>
						<Space height={insets.bottom} />
					</View>
				</Animated.ScrollView>
			</SafeAreaView>
		</ImageBackground>
	);
};

export default forwardRef(UserView);
