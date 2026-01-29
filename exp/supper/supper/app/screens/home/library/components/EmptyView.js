import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { colors } from 'configs';
import { Text } from 'atoms';
import EmptyLottie from 'assets/lottie/empty.json';

export const EmptyView = () => {
	return (
		<View style={styles.unavailableContainer}>
			<LottieView style={{ width: '40%', aspectRatio: 1 }} source={EmptyLottie} autoPlay loop />
			<Text variant={'P2'}>We're sorry</Text>
			<Text variant={'P5'} style={styles.unavailableSubtext}>
				But there's no result :(
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	unavailableContainer: { alignItems: 'center', marginTop: 40 },
	unavailableSubtext: {
		color: colors.secondaryFont,
		marginTop: 3,
	},
});
