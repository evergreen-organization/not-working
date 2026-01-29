import { View, ActivityIndicator, ColorValue, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { colors } from 'configs';
import { Text } from '../text';

interface ILoading {
	label?: string;
	size?: 'small' | 'large';
	color?: ColorValue;
	gifLoading?: any;
	isPagingLoading?: boolean;
}

const defaultGifLoading = require('../../../assets/loading2.gif');

const Loading = ({
	label,
	color = colors.primary,
	size = 'large',
	gifLoading = defaultGifLoading,
	isPagingLoading,
}: ILoading) => {
	if (isPagingLoading) {
		return (
			<View style={styles.gifView}>
				<Image source={gifLoading} style={styles.gifImage} />
			</View>
		);
	}

	return (
		<View style={[styles.container]}>
			<View style={[styles.indicatorContainer]}>
				<ActivityIndicator color={color} size={size} />
			</View>
			{label ? (
				<View style={styles.labelBox}>
					<Text style={styles.loadLabel}>{label}</Text>
				</View>
			) : null}
		</View>
	);
};

export default Loading;
