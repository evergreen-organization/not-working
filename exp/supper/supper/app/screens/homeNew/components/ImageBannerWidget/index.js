import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import MFABanner from 'assets/mfa_home_banner.png';
import { colors } from 'configs';
import Animated, { FadeIn } from 'react-native-reanimated';

export const ImageBannerWidget = (props) => {
	const { onPress } = props;
	const { width } = useWindowDimensions();

	return (
		<Animated.View entering={FadeIn} style={styles.container}>
			<Animated.View style={[styles.animatedView, { width: width * 0.95 }]}>
				<TouchableOpacity onPress={onPress}>
					<Animated.Image
						source={MFABanner}
						style={[styles.animatedImage, { width: width * 0.95 }]}
					/>
				</TouchableOpacity>
			</Animated.View>
		</Animated.View>
	);
};

export const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 20,
		shadowColor: colors.black,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 1,
	},
	animatedView: {
		borderRadius: 10,
		height: undefined,
		aspectRatio: 2,
		overflow: 'hidden',
	},
	animatedImage: {
		borderRadius: 10,
		height: undefined,
		aspectRatio: 2,
	},
});
