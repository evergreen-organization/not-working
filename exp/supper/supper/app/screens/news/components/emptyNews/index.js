import React from 'react';
import { Image, View } from 'react-native';
import NewsIcon from 'assets/icon/news.png';

import { Text } from 'atoms';

import { styles } from './styles';
export const EmptyNews = () => {
	return (
		<View style={styles.noticeContainer}>
			<View style={styles.imageContainer}>
				<Image source={NewsIcon} style={styles.image} />
			</View>
			<Text variant={'P6'} style={styles.notice}>
				No News
			</Text>
		</View>
	);
};
