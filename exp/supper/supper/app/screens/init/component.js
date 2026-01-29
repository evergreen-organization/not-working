import React from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import { Loading } from 'atoms';

export const InitLoadingView = () => {
	return (
		<View style={styles.container}>
			<Loading />
		</View>
	);
};
