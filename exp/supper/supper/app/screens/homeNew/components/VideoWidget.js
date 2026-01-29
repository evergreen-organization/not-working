import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, useWindowDimensions } from 'react-native';

export const VideoWidget = () => {
	const { width } = useWindowDimensions();
	const [videoHeight, setVideoHeight] = useState(350);
	const [opacity] = useState(new Animated.Value(0));

	useEffect(() => {
		setTimeout(() => {
			setVideoHeight(150);
		}, 7000);
		setTimeout(() => {
			Animated.sequence([
				Animated.timing(opacity, {
					toValue: 0.1,
					duration: 1000,
					useNativeDriver: false,
				}),
				Animated.timing(opacity, {
					toValue: 1,
					duration: 100,
					useNativeDriver: false,
				}),
			]).start();
		}, 6000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: false,
		}).start();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Animated.View style={[styles.container, { opacity: opacity }]}>
			<Animated.View
				style={[
					styles.videoContainer,
					{ height: videoHeight, width: width * 0.9 },
				]}
			>
				{/*<Animated.Image*/}
				{/*	source={FestiveGif}*/}
				{/*	resizeMode="cover"*/}
				{/*	style={[styles.imageGif, { height: videoHeight, width: width * 0.9 }]}*/}
				{/*/>*/}
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: 20,
	},
	videoContainer: {
		overflow: 'hidden',
		borderRadius: 10,
	},
	imageGif: {
		borderRadius: 10,
	},
});
