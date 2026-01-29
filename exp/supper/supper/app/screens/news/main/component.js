import React from 'react';
import { View } from 'react-native';

import { Loading, Screen } from 'atoms';
import { Header } from 'molecules';
import { NewsList } from '../components';

import { Typography } from 'styles';

import { styles } from './styles';

export const NewsView = ({ handleRefresh, handleReachEnd, news, loading, navigation }) => {
	const handleHeaderLeftBtn = () => navigation.goBack();

	return (
		<Screen>
			<Header
				leftComponent={{
					icon: 'chevron-left',
					type: 'font-awesome',
					testID: 'header-back-button',
					onPress: handleHeaderLeftBtn,
				}}
				centerComponent={{
					text: 'News',
					style: Typography.H6,
				}}
			/>
			<View style={styles.flex}>
				<NewsList
					data={news}
					onRefresh={handleRefresh}
					refreshing={loading}
					onEndReached={handleReachEnd}
				/>
				{loading && <Loading />}
			</View>
		</Screen>
	);
};
